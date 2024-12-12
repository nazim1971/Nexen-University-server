import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync( async (req, res)=>{
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Semester Registration is created successfully',
      data: result,
    });
})


export const SemesterRegistrationController = {
    createSemesterRegistration
}