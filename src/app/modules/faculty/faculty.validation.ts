import { z } from 'zod';

const facultyNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});

const createFacultyValidationSchema = z.object({
  faculty: z.object({
    designation: z.string(),
    name: facultyNameValidationSchema,
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    profileImg: z.string(),
  }),
});

const updateFacultyNameValidationSchema = z.object({
    firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }).optional(),
  middleName: z.string().optional(), 
  lastName: z.string().optional(),
  });
  
  const updateFacultyValidationSchema = z.object({
    faculty: z.object({
        designation: z.string().optional(),
        name: updateFacultyNameValidationSchema.optional(), 
        gender: z.enum(['male', 'female']).optional(), 
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(), 
        contactNo: z.string().optional(), 
        emergencyContactNo: z.string().optional(), 
        presentAddress: z.string().optional(), 
        permanentAddress: z.string().optional(), 
        academicFaculty: z.string().optional(), 
        academicDepartment: z.string().optional(),
        profileImg: z.string().optional(),
    }),
  });
export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema
};
