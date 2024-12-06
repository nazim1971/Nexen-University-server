import express from 'express';
import { validateMiddlewire } from '../../utils/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post('/create-academic-faculty', validateMiddlewire(AcademicFacultyValidation.academicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty);

router.get('/:facultyId', AcademicFacultyController.singleAcademicFaculty)

router.get('/', AcademicFacultyController.allAcademicFaculty)

router.patch('/:facultyId', validateMiddlewire(AcademicFacultyValidation.updateAcademicFacultyValidationSchema) , AcademicFacultyController.updateAcademicFaculty)

export const AcademicFacultyRoutes = router;
