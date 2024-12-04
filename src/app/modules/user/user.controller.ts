import httpStatus from 'http-status';
import { RequestHandler} from 'express';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';


const createStudent: RequestHandler = catchAsync(async (req, res) => {
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

export const UserController = {
  createStudent,
};
