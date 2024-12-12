import { SemesterRegistrationController } from './semesterRegistration.controller';
import express from 'express';

const router = express.Router();

router.post('/create-semester-registration', SemesterRegistrationController.createSemesterRegistration );

router.get('/:id', )

router.get('/', )

router.patch('/:id',)

export const SemesterRegistrationRoutes = router;
