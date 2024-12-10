
import { z } from 'zod';

const adminNameValidationSchema = z.object({
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

const createAdminValidationSchema = z.object({
  admin: z.object({
    designation: z.string(),
    name: adminNameValidationSchema,
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string(),
  }),
});

const updateAdminNameValidationSchema = z.object({
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
  
  const updateAdminValidationSchema = z.object({
    admin: z.object({
        designation: z.string().optional(),
        name: updateAdminNameValidationSchema.optional(), 
        gender: z.enum(['male', 'female']).optional(), 
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(), 
        contactNo: z.string().optional(), 
        emergencyContactNo: z.string().optional(), 
        presentAddress: z.string().optional(), 
        permanentAddress: z.string().optional(), 
        profileImg: z.string().optional(),
    }).strict(),
  });
export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema
};
