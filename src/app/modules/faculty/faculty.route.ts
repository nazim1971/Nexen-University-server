import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyController.allFaculty)
router.get('/:facultyId', FacultyController.getSingleFaculty)
router.patch('/:facultyId', FacultyController.allFaculty)
router.delete('/:facultyId', FacultyController.allFaculty)

export const FacultyRoutes = router;
