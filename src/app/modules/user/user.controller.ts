import httpStatus from 'http-status';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';


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
    const {userId, role} = req.user
    const result = await UserService.getMe(userId, role);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User Data revert successfully',
      data: result,
    });
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
};
 