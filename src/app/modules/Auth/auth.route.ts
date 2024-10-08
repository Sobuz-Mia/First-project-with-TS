import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidations } from './auth.validations';
import { AuthControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.post(
  '/forgot-password',
  validateRequest(AuthValidations.forgotPasswordValidationSchema),
  AuthControllers.forgotPassword,
);
router.post(
  '/reset-password',
  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);
export const AuthRoutes = router;
