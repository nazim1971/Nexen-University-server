import { z } from 'zod';

const loginValidationSchema = z.object({
  id: z.string({ required_error: 'Id is required' }),
  password: z.string({ required_error: 'Password is required' }),
});

const  changePassValidationSchema = z.object({
  oldPassword: z.string({ required_error: 'Old Password is required' }),
  newPassword: z.string({ required_error: 'New Password is required' }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePassValidationSchema,
  refreshTokenValidationSchema
};
