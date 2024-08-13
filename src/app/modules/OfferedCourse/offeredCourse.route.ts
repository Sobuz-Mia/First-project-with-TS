import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);
router.get('/', OfferedCourseController.getAllOfferedCourse);
router.get('/:id', OfferedCourseController.getSingleOfferedCourse);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseController.updateOfferedCourse,
);

export const OfferedCourseRoutes = router;
