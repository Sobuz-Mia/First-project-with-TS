import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middleware/auth';

const router = express.Router();

router.get(
  '/:id',
  auth('admin', 'faculty'),
  StudentControllers.getSingleStudent,
);

router.patch(
  '/:id',
  auth('admin', 'faculty'),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
