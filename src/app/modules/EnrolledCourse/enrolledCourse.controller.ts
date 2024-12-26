import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { EnrolledCourseService } from "./enrolledCourse.service";


const createEnrolledCourse = catchAsync(
    async (req, res) => {

        const userId = req.user.userId
       const result = await EnrolledCourseService.createEnrolledCourseInDB(userId, payload)
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