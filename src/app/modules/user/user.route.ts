import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { createStudentValidationSchema } from '../student/student.zodValidation';

const router = express.Router();

const validateMiddlewire = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //VALIDATION check
    //if everything all right next() ->
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/create-student',
  validateMiddlewire(createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
