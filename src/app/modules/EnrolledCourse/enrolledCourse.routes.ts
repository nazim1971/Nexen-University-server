import { Router } from "express";
import { validateMiddlewire } from "../../utils/validateRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";
import { EnrolledCourseController } from "./enrolledCourse.controller";

export const EnrolledCourseRoutes = Router();

EnrolledCourseRoutes.post('/create-enrolled-course',validateMiddlewire(EnrolledCourseValidations.createEnrolledCourseValidationZodSchema), EnrolledCourseController.createEnrolledCourse)