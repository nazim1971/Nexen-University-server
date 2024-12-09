import express from 'express';
import { FacultyController } from './faculty.controller';

const router = express.Router();



router.get('/', FacultyController.allFaculty)


export const FacultyRoutes = router;
