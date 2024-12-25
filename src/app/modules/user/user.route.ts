import express from 'express';
import { UserController } from './user.controller';
import { validateMiddlewire } from '../../utils/validateRequest';
import { studentValidations } from '../student/student.zodValidation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidation } from '../admin/admin.validation';
import { auth } from '../../middlewires/auth';
import { USER_ROLE } from './user.const';
import { userValidation } from './user.validation';
import { upload } from '../../utils/saveImgaeToCloudinary';
import  { NextFunction, Request, Response } from 'express';

const router = express.Router();


router.post(
  '/create-student',
  // auth(USER_ROLE.admin)  ,
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
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

router.post(
  '/change-status/:id', auth(USER_ROLE.admin),
  validateMiddlewire(userValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

//his his huss huss data
router.get(
  '/me', auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  UserController.getMe,
);


export const UserRoutes = router;
