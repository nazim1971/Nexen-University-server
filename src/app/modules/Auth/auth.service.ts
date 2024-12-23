import config from '../../config';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt, { expiresIn: '10d' });

  const refreshToken = jwt.sign(jwtPayload, config.jwtRef, { expiresIn: '365d' });

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needPasswordChange,
  };

};

const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByCustomId(userData?.userId);

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
    payload?.oldPassword,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }

  //hash new pass
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.slat),
  );

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async(token: string)=>{
   // checking if the given token is valid
   const decoded = jwt.verify(
    token,
    config.jwtRef,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt, { expiresIn: '10d' });

  return {
    accessToken,
  };
}

export const AuthService = {
  loginUser,
  changePasswordIntoDB,
  refreshToken
};
