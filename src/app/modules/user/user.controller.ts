import httpStatus from 'http-status';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../errors/AppError';


const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

    // Data validation  using zod
    //const zodParseData = studentValidationSchema.parse(student);

    const result = await UserService.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Student is created successfully',
      data: result,
    });
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

    const result = await UserService.createFacultyIntoDB(password, facultyData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Faculty is created successfully',
      data: result,
    });
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

    const result = await UserService.createAdminIntoDB(password, adminData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Admin is created successfully',
      data: result,
    });
})

const getMe = catchAsync(async (req, res) => {

  const token = req.headers.authorization

  if(!token){
    throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
  }
    const result = await UserService.getMe(token);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User Data revert successfully',
      data: result,
    });
})

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe
};
 