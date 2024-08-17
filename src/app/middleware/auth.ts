import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { userModel } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if the token is send from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!');
    }
    // check if the token is valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;
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
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This user is already blocked',
      );
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
    // checking role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
