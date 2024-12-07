import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { academicSemester } from '../academmicSemester.ts/academicSemester.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

const createStudentIntoDB = async (
  password: string = config.password,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<Tuser> = {};

  //if psssword is not give , use deafult password

  userData.password = password;

  userData.role = 'student';

  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(404, 'Admission semester not found');
  }
  // session isolated area and do this in try-catch block
  const session = await mongoose.startSession();

  try {
    //startsession transection
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    //create a user (transection -1)
    const newUser = await User.create([userData], { session });

    //create a student
    //before transection new user is object now array
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //Create a student Transaction -> 2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //end the session and transection
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    //* ROllback the transection
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

export const UserService = {
  createStudentIntoDB,
};
