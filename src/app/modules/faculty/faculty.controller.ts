import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.services";


const allFaculty = catchAsync(async(req,res)=>{
    const result=  await FacultyServices.getAllFacultyFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Faculty is revert successfully',
        data: result,
      });
})

export const FacultyController = {
    allFaculty
}