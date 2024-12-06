import express from 'express';
import { validateMiddlewire } from '../../utils/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';


const router = express.Router();

router.post('/create-academic-Department', validateMiddlewire(AcademicDepartmentValidation.academicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment);

router.get('/:DepartmentId', AcademicDepartmentController.singleAcademicDepartment)

router.get('/', AcademicDepartmentController.allAcademicDepartment)

router.patch('/:DepartmentId', validateMiddlewire(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema) , AcademicDepartmentController.updateAcademicDepartment)

export const AcademicDepartmentRoutes = router;
