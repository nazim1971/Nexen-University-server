import express from 'express';
import { UserController } from './user.controller';

import { validateMiddlewire } from '../../utils/validateRequest';
import { studentValidations } from '../student/student.zodValidation';
import { FacultyValidation } from '../faculty/faculty.validation';

const router = express.Router();


router.post(
  '/create-student',
  validateMiddlewire(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateMiddlewire(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);
export const UserRoutes = router;
