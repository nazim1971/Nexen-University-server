import express from 'express';
import { UserController } from './user.controller';

import { validateMiddlewire } from '../../utils/validateRequest';
import { studentValidations } from '../student/student.zodValidation';

const router = express.Router();


router.post(
  '/create-student',
  validateMiddlewire(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
