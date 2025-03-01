import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Department must be string',
    required_error: 'Name is required',
  }),
  academicFaculty: z.string({
    invalid_type_error: 'Academic faculty must be string',
    required_error: 'Faculty is required',
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Name is required',
      }).optional(),
      academicFaculty: z.string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Faculty is required',
      }).optional(),
});


export const AcademicDepartmentValidation = {
  academicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema
};
