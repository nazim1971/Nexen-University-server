import express from 'express';
import { FacultyController } from './faculty.controller';
import { validateMiddlewire } from '../../utils/validateRequest';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.allFaculty)
router.get('/:facultyId', FacultyController.getSingleFaculty)
router.patch('/:facultyId', validateMiddlewire(FacultyValidation.updateFacultyValidationSchema) , FacultyController.updateFaculty)
router.delete('/:facultyId', FacultyController.deleteFaculty)

export const FacultyRoutes = router;
