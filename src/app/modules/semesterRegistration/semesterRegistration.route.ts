import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
