import express from 'express';
import { validateMiddlewire } from '../../utils/validateRequest';
import { AcademicSemesterValitions } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
import { auth } from '../../middlewires/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post('/create-academic-semester', validateMiddlewire(AcademicSemesterValitions.createAcademicValidationSchema), AcademicSemesterController.createAcademicSemester);

router.get('/:semesterId', AcademicSemesterController.singleAcademicSemester)

router.get('/', auth(USER_ROLE.admin) , AcademicSemesterController.allAcademicSemester)

router.patch('/:semesterId', validateMiddlewire(AcademicSemesterValitions.updateAcademicValidationSchema) , AcademicSemesterController.updateAcademicSemester)

export const AcademicSemesterRoutes = router;
