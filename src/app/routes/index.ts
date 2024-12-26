import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academmicSemester.ts/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { CourseRoutes } from '../modules/course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../modules/offeredCourse/offeredCourse.route';
import { AuthenticationRoute } from '../modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.routes';

const router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/student', route: StudentRoutes },
  { path: '/academic-semester', route: AcademicSemesterRoutes },
  { path: '/academic-faculty', route: AcademicFacultyRoutes },
  { path: '/academic-department', route: AcademicDepartmentRoutes },
  { path: '/faculties', route: FacultyRoutes },
  { path: '/admin', route: AdminRoutes },
  { path: '/course', route: CourseRoutes },
  { path: '/semester-registration', route: SemesterRegistrationRoutes },
  { path: '/offered-course', route: offeredCourseRoutes },
  { path: '/auth', route: AuthenticationRoute },
  { path: '/enrolled-courses', route: EnrolledCourseRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
