import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academmicSemester.ts/academicSemester.route';

const router = Router();

const moduleRoutes = [
  { path: '/user', route: UserRoutes },
  { path: '/student', route: StudentRoutes },
  { path: '/academic-semester', route: AcademicSemesterRoutes}
];


moduleRoutes.forEach((route)=> router.use(route.path, route.route))

export default router;
