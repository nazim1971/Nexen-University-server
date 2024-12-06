import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academmicSemester.ts/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

const router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/student', route: StudentRoutes },
  { path: '/academic-semester', route: AcademicSemesterRoutes },
  { path: '/academic-faculty', route: AcademicFacultyRoutes },
  { path: '/academic-department', route: AcademicDepartmentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
