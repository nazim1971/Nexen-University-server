import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { EnrolledCourseService } from "./enrolledCourse.service";


const createEnrolledCourse = catchAsync(
    async (req, res) => {
       const result = await EnrolledCourseService.createEnrolledCourseInDB()
       sendResponse(res, {
         statusCode: httpStatus.OK,
         success: true,
         message: 'Student is enrolled successfully',
         data: result,
       });
   },
 );

 export const EnrolledCourseController = {
    createEnrolledCourse
 }