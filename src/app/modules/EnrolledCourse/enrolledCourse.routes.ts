import { Router } from "express";
import { validateMiddlewire } from "../../utils/validateRequest";
import { EnrolledCourseValidations } from "./enrolledCourse.validation";
import { EnrolledCourseController } from "./enrolledCourse.controller";
import { auth } from "../../middlewires/auth";
import { USER_ROLE } from "../user/user.const";

export const EnrolledCourseRoutes = Router();

EnrolledCourseRoutes.post('/create-enrolled-course',auth(USER_ROLE.student),validateMiddlewire(EnrolledCourseValidations.createEnrolledCourseValidationZodSchema), EnrolledCourseController.createEnrolledCourse)