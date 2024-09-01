import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { userModel } from './../user/user.model';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';

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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await userModel.isUserExistByCustomId(userData?.userId);
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
  if (
    !(await userModel.isPasswordMatched(payload?.oldPassword, user.password))
  ) {
    // check if the password is correct

    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }
  // hash new password

  const hashedNewPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await userModel.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: hashedNewPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // if the token is send from the client
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!');
  }
  // check if the token is valid

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;
  const { userId, iat } = decoded;
  // checking if the user is exist
  const user = await userModel.isUserExistByCustomId(userId);
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
  // checking token issued timestamp and password change timestamp
  if (
    user?.passwordChangeAt &&
    userModel.isJWTIssuedBeforePasswordChanged(
      user?.passwordChangeAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!');
  }
  //   create token and send to the client
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return { accessToken };
};

const forgotPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await userModel.isUserExistByCustomId(userId);
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
  //   create token and send to the client
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );
  const resetUILink = `${config.reset_pass_ui_link}/?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
  console.log(resetUILink);
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
};
