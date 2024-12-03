import httpStatus from 'http-status';
import { RequestHandler} from 'express';
import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';


const createStudent: RequestHandler = async (req, res) => {
  try {
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
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserController = {
  createStudent,
};
