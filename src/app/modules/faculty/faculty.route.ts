import express from 'express';
import { FacultyController } from './faculty.controller';
import { validateMiddlewire } from '../../utils/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { auth } from '../../middlewires/auth';

const router = express.Router();

router.get('/', auth() ,FacultyController.allFaculty)
router.get('/:facultyId', FacultyController.getSingleFaculty)
router.patch('/:facultyId', validateMiddlewire(FacultyValidation.updateFacultyValidationSchema) , FacultyController.updateFaculty)
router.delete('/:facultyId', FacultyController.deleteFaculty)

export const FacultyRoutes = router;
