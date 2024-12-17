import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt'

const loginUser = async (payload: TLoginUser) => {
  // const isUserExist = 

  if (!User.isUserExistsByCustomId(payload.id)) {
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

  // console.log(isPassMatch);
};

export const AuthService = {
  loginUser,
};
