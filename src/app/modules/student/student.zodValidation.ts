
import { z } from 'zod';

// Validation for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required'
    })
    .min(2, 'First name must be at least 2 characters long'),

  middleName: z.string().optional(),

  lastName: z
    .string({
      required_error: 'Last name is required'
    })
    .min(2, 'Last name must be at least 2 characters long'),
});

// Validation for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string({
    required_error: 'Father’s name is required'
  }),

  fatherOccupation: z.string({
    required_error: 'Father’s occupation is required'
  }),

  fatherContactNo: z.string({
    required_error: 'Father’s contact number is required'
  }),

  motherName: z.string({
    required_error: 'Mother’s name is required'
  }),

  motherOccupation: z.string({
    required_error: 'Mother’s occupation is required'
  }),

  motherContactNo: z.string({
    required_error: 'Mother’s contact number is required'
  }),
});

// Validation for LocalGuardian
const localGuardianValidationSchema = z.object({
  Name: z.string({
    required_error: 'Local guardian’s name is required'
  }),

  Occupation: z.string({
    required_error: 'Local guardian’s occupation is required'
  }),

  ContactNo: z.string({
    required_error: 'Local guardian’s contact number is required'
  }),
});

// Validation for Student
const studentValidationSchema = z.object({
  id: z.string({
    required_error: 'ID is required'
  }),
  password: z.string().min(8, "Password must be at least 8 characters long"),

  name: userNameValidationSchema,

  gender: z.enum(['female', 'male'], {
    required_error: 'Gender is required'
  }),

  dateOfBirth: z.string({
    required_error: 'Date of birth is required'
  }),

  email: z
    .string({
      required_error: 'Email is required'
    })
    .email('Invalid email format'),

  contactNo: z.string({
    required_error: 'Contact number is required'
  }),

  emergencyContactNo: z.string({
    required_error: 'Emergency contact number is required'
  }),

  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      invalid_type_error: 'Blood group must be a valid type',
    })
    .optional(),

  presentAddress: z.string({
    required_error: 'Present address is required'
  }),

  permanentAddress: z.string({
    required_error: 'Permanent address is required'
  }),

  guardian: guardianValidationSchema,

  localGuardian: localGuardianValidationSchema,

  profileImage: z.string().optional(),

  isActive: z
    .enum(['active', 'blocked'], {
      required_error: 'Status is required',
    })
    .default('active'),
  isDeleted: z.boolean().default(false),
});

export { studentValidationSchema };
