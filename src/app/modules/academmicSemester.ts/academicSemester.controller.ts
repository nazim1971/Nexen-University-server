import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';


const createAcademicSemester = catchAsync(async (req, res) => {
  
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Academic Semester is created successfully',
      data: result,
    });
})

export const AcademicSemesterController = {
  createAcademicSemester
};
