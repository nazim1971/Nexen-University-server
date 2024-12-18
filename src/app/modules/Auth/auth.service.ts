import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
// import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
  
  const user = await User.isUserExistByCustomId(payload?.id)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!!!');
  }

  // const isDeleted = isUserExist?.isDeleted;
  // // check if the user is already deleted
  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is not found!!!');
  // }

  // const userStatus = isUserExist?.status;
  // // check if the user is already deleted
  // if (userStatus === "blocked") {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!!!');
  // }

  // //check if the pass is correct

  // const isPassMatch = await bcrypt.compare(payload.password, isUserExist?.password)

  // Check if the password matches
  const isPasswordMatch = await User.isPasswordMatched(payload?.password, user?.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }

  // console.log(isPassMatch);
};

export const AuthService = {
  loginUser,
};
