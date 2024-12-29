import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { EnrolledCourseService } from './enrolledCourse.service';
import httpStatus from 'http-status';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseService.createEnrolledCourseInDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyID = req.user.id;
  const result = await EnrolledCourseService.updateMarks(facultyID, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated successfully',
    data: result,
  });
});

export const EnrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
