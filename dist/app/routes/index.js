"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const student_route_1 = require("../modules/student/student.route");
const academicSemester_route_1 = require("../modules/academmicSemester.ts/academicSemester.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/user', route: user_route_1.UserRoutes },
    { path: '/student', route: student_route_1.StudentRoutes },
    { path: '/academic-semester', route: academicSemester_route_1.AcademicSemesterRoutes },
    { path: '/academic-faculty', route: academicFaculty_route_1.AcademicFacultyRoutes },
    { path: '/academic-department', route: academicDepartment_route_1.AcademicDepartmentRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
