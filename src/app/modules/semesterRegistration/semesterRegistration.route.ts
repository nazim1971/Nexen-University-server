import { validateMiddlewire } from '../../utils/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import express from 'express';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

router.patch('/:id' , validateMiddlewire(SemesterRegistrationValidations.upadateSemRegValSchema) );

export const SemesterRegistrationRoutes = router;
