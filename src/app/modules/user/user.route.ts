import express from 'express';
import { UserController } from './user.controller';
import { validateMiddlewire } from '../../utils/validateRequest';
import { studentValidations } from '../student/student.zodValidation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import { auth } from '../../middlewires/auth';
import { USER_ROLE } from './user.const';

const router = express.Router();


router.post(
  '/create-student', auth(USER_ROLE.admin) ,
  validateMiddlewire(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',auth(USER_ROLE.admin),
  validateMiddlewire(FacultyValidation.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin', auth(USER_ROLE.admin),
  validateMiddlewire(AdminValidation.createAdminValidationSchema),
  UserController.createAdmin,
);
export const UserRoutes = router;
