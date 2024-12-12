import { SemesterRegistrationController } from './semesterRegistration.controller';
import express from 'express';

const router = express.Router();

router.post('/create-semester-registration', SemesterRegistrationController.createSemesterRegistration );

router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration )

router.get('/',SemesterRegistrationController.getAllSemesterRegistration )

router.patch('/:id',)

export const SemesterRegistrationRoutes = router;
