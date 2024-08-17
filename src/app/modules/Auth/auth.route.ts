import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidations } from './auth.validations';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
