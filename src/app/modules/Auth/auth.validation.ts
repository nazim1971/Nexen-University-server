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
  refreshToken: z.string({
    required_error: 'Refresh token is required!',
  }),
});

const forgetPasswordValidationSchema = z.object({
  id: z.string({
    required_error: 'User id is required!',
  }),
})

const resetPasswordValidationSchema = z.object({
  id: z.string({
    required_error: 'User id is required!',
  }),
  newPassword: z.string({
    required_error: 'User password is required!',
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePassValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
};
