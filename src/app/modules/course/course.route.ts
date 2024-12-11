import express from 'express';
import { validateMiddlewire } from '../../utils/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post('/create-course', validateMiddlewire(CourseValidations.createCourseValidationSchema), CourseController.createCourse);

router.get('/:courseId', CourseController.singleCourse)

router.get('/', CourseController.allCourse)

router.delete('/:courseId', CourseController.deleteCourse)

router.patch('/:courseId', validateMiddlewire(CourseValidations.updateCourseValidationSchema) , CourseController.updateCourse)

export const CourseRoutes = router;
