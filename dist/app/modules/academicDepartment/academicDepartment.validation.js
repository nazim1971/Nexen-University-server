"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
const academicDepartmentValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Name is required',
    }),
    academicFaculty: zod_1.z.string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
    }),
});
const updateAcademicDepartmentValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Name is required',
    }).optional(),
    academicFaculty: zod_1.z.string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
    }).optional(),
});
exports.AcademicDepartmentValidation = {
    academicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
};
