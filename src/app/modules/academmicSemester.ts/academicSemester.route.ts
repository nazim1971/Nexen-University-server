import express from 'express';
import { validateMiddlewire } from '../../utils/validateRequest';
import { AcademicSemesterValitions } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post('/create-academic-semester', validateMiddlewire(AcademicSemesterValitions.createAcademicValidationSchema), AcademicSemesterController.createAcademicSemester);

router.get('/:semesterId', AcademicSemesterController.singleAcademicSemester)

router.get('/', AcademicSemesterController.allAcademicSemester)

router.patch('/:semesterId', validateMiddlewire(AcademicSemesterValitions.updateAcademicValidationSchema) , AcademicSemesterController.updateAcademicSemester)

export const AcademicSemesterRoutes = router;
