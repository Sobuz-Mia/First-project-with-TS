import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await userModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found');
  }
  //   checking if the user already deleted
  if (await userModel.isUserDeleted(user?.isDeleted)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
  }
  //   checking user status
  if (await userModel.userBlock(user?.status)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is already blocked');
  }
  if (!(await userModel.isPasswordMatched(payload?.password, user?.password))) {
    // check if the password is correct
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }
  //   create token and send to the client
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
