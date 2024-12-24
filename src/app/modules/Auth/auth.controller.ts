import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
   
  const result = await AuthService.loginUser(req.body);
  const { accessToken, refreshToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is login successfully',
    data: {
     Atoken: accessToken,
      refreshToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthService.changePasswordIntoDB(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthService.forgetPassword(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
})

// const resetPassword = catchAsync(async (req, res) => {
//   const token = req.headers.authorization;

//   const result = await AuthService.resetPassword(req.body, token);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Password reset succesful!',
//     data: result,
//   });
// })


export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  // resetPassword
};
