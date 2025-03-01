"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValitions = void 0;
const zod_1 = require("zod");
const academicSemester_const_1 = require("./academicSemester.const");
const createAcademicValidationSchema = zod_1.z.object({
    name: zod_1.z.enum([...academicSemester_const_1.academicSemesterNames]),
    code: zod_1.z.enum([...academicSemester_const_1.academicSemesterCodes]),
    year: zod_1.z.string(),
    startMonth: zod_1.z.enum([...academicSemester_const_1.academicSemesterMonths]),
    endMonth: zod_1.z.enum([...academicSemester_const_1.academicSemesterMonths])
});
const updateAcademicValidationSchema = zod_1.z.object({
    name: zod_1.z.enum([...academicSemester_const_1.academicSemesterNames]).optional(),
    code: zod_1.z.enum([...academicSemester_const_1.academicSemesterCodes]).optional(),
    year: zod_1.z.string().optional(),
    startMonth: zod_1.z.enum([...academicSemester_const_1.academicSemesterMonths]).optional(),
    endMonth: zod_1.z.enum([...academicSemester_const_1.academicSemesterMonths]).optional()
});
exports.AcademicSemesterValitions = {
    createAcademicValidationSchema,
    updateAcademicValidationSchema
};
