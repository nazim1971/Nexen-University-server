import express from 'express';
import { StudentControllers } from './student.controller';
import { validateMiddlewire } from '../../utils/validateRequest';
import { studentValidations } from './student.zodValidation';

const router = express.Router();

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudent);

router.patch('/:studentId', validateMiddlewire(studentValidations.updateStudentValidationSchema) ,StudentControllers.updateStudent);

export const StudentRoutes = router;