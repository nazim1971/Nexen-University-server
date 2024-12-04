import express from 'express';
import { UserController } from './user.controller';

import { createStudentValidationSchema } from '../student/student.zodValidation';
import { validateMiddlewire } from '../../utils/validateRequest';

const router = express.Router();


router.post(
  '/create-student',
  validateMiddlewire(createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
