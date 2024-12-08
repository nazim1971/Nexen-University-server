"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
const zod_1 = require("zod");
const userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string(),
});
const guardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string(),
    fatherOccupation: zod_1.z.string(),
    fatherContactNo: zod_1.z.string(),
    motherName: zod_1.z.string(),
    motherOccupation: zod_1.z.string(),
    motherContactNo: zod_1.z.string(),
});
const localGuardianValidationSchema = zod_1.z.object({
    Name: zod_1.z.string(),
    Occupation: zod_1.z.string(),
    ContactNo: zod_1.z.string()
});
const createStudentValidationSchema = zod_1.z.object({
    student: zod_1.z.object({
        name: userNameValidationSchema,
        gender: zod_1.z.enum(['male', 'female', 'other']),
        dateOfBirth: zod_1.z.string(),
        email: zod_1.z.string().email(),
        contactNo: zod_1.z.string(),
        emergencyContactNo: zod_1.z.string(),
        bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        presentAddress: zod_1.z.string(),
        permanentAddress: zod_1.z.string(),
        guardian: guardianValidationSchema,
        localGuardian: localGuardianValidationSchema,
        admissionSemester: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        profileImg: zod_1.z.string(),
    }),
});
const updateUserNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
        message: 'First Name must start with a capital letter',
    })
        .optional(),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
}).strict();
const updateGuardianValidationSchema = zod_1.z.object({
    fatherName: zod_1.z.string().optional(),
    fatherOccupation: zod_1.z.string().optional(),
    fatherContactNo: zod_1.z.string().optional(),
    motherName: zod_1.z.string().optional(),
    motherOccupation: zod_1.z.string().optional(),
    motherContactNo: zod_1.z.string().optional(),
}).strict();
const updateLocalGuardianValidationSchema = zod_1.z.object({
    Name: zod_1.z.string().optional(),
    Occupation: zod_1.z.string().optional(),
    ContactNo: zod_1.z.string().optional(),
}).strict();
const updateStudentValidationSchema = zod_1.z.object({
    student: zod_1.z.object({
        name: updateUserNameValidationSchema.optional(),
        gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        contactNo: zod_1.z.string().optional(),
        emergencyContactNo: zod_1.z.string().optional(),
        bloodGroup: zod_1.z
            .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
            .optional(),
        presentAddress: zod_1.z.string().optional(),
        permanentAddress: zod_1.z.string().optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        admissionSemester: zod_1.z.string().optional(),
        academicDepartment: zod_1.z.string().optional(),
        profileImg: zod_1.z.string().optional(),
    }).strict(),
}).strict();
exports.studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema
};
