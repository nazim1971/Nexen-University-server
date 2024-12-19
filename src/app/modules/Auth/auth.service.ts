import config from '../../config';
import { AppError } from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt  from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!!!');
  }

  const isDeleted = user?.isDeleted;
  // check if the user is already deleted
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not found!!!');
  }

  const userStatus = user?.status;
  // check if the user is already deleted
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!!!');
  }

  // Check if the password matches
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }

  //create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt, {expiresIn: '10d'}  );
  return {
    accessToken,
    needsPasswordChange: user?.needPasswordChange
  }
};

const changePasswordIntoDB = async(user:{userId: string, role: string}, payload )=> {
  const result = await User.findOneAndUpdate({
    id: user.userId,
    role: user.role
  })
}

export const AuthService = {
  loginUser,
  changePasswordIntoDB
};
