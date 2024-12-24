import { z } from 'zod';
import { userStatus } from './user.const';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

const changeStatusValidationSchema = z.object({
  status: z.enum([...userStatus] as [string, ...string[]]),
});

export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
