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
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { generateFacultyId } from '../faculty/faculty.utils';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TAdmins } from '../admin/admin.interface';
import { generateAdminId } from '../admin/admin.utils';
import { Admin } from '../admin/admin.model';
import { sendImageToCloudinary } from '../../utils/saveImgaeToCloudinary';

const createStudentIntoDB = async (
  file: any,
  password: string = config.password,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<Tuser> = {};

  userData.password = password;

  userData.role = 'student';
  userData.email = payload.email;

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

    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;

    const { secure_url } = await sendImageToCloudinary(imageName, path);
    //create a user (transection -1)
    const newUser = await User.create([userData], { session });

    //create a student
    //before transection new user is object now array
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    console.log('secret url12222');
    payload.profileImage = secure_url;

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

const createFacultyIntoDB = async (
  password: string = config.password,
  payload: TFaculty,
) => {
  const userData: Partial<Tuser> = {};

  userData.password = password;

  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(404, 'Academic department not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Generate the faculty ID
    userData.id = await generateFacultyId();

    // Create a new user (Transaction Step 1)
    const newUser = await User.create([userData], { session });
    // Ensure the user was created
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Set the generated user ID and reference it in the faculty payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create the faculty (Transaction Step 2)
    const newFaculty = await Faculty.create([payload], { session });

    // Ensure the faculty was created
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

const createAdminIntoDB = async (
  password: string = config.password,
  payload: TAdmins,
) => {
  const userData: Partial<Tuser> = {};

  userData.password = password;

  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Generate the Admin ID
    userData.id = await generateAdminId();

    // Create a new user (Transaction Step 1)
    const newUser = await User.create([userData], { session });
    // Ensure the user was created
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // Set the generated user ID and reference it in the Admin payload
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create the Admin (Transaction Step 2)
    const newAdmin = await Admin.create([payload], { session });

    // Ensure the Admin was created
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

const getMe = async (userId: string, role: string) => {
  if (!userId || !role) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Invalid token or missing user data',
    );
  }
  // Define result and switch based on role
  let result = null;
  switch (role) {
    case 'student':
      result = await Student.findOne({ id: userId });
      break;
    case 'faculty':
      result = await Faculty.findOne({ id: userId });
      break;
    case 'admin':
      result = await Admin.findOne({ id: userId });
      break;
    default:
      throw new Error('Invalid role');
  }

  // Handle if the user is not found
  if (!result) {
    throw new Error(`No ${role} found with ID: ${userId}`);
  }

  return result;
};


const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findOneAndUpdate({id: id}, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus
};
