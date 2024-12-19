import express from 'express'
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { validateMiddlewire } from '../../utils/validateRequest';
import { auth } from '../../middlewires/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post('/login',validateMiddlewire(AuthValidation.loginValidationSchema) ,AuthController.loginUser)

router.post('/change-password', auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin) , validateMiddlewire(AuthValidation.changePassValidationSchema) ,AuthController.changePassword)

export const AuthenticationRoute = router;
