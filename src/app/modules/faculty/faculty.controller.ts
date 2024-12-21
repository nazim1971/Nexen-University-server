import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.services";
import { AppError } from "../../errors/AppError";


const allFaculty = catchAsync(async(req,res)=>{
    const result=  await FacultyServices.getAllFacultyFromDB();
    console.log(req.cookies);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Faculty is revert successfully',
        data: result,
      });
})

  const getSingleFaculty = catchAsync(async (req, res,next) => {
    const { facultyId } = req.params;
    const result = await FacultyServices.getSingleFaculty(facultyId);
    if (!result) {
      return next(new AppError(404, 'This Faculty is not found!'));
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single Faculty are retrieved successfully',
      data: result,
    });
  });
  
  const updateFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const {faculty} = req.body;
    const result = await FacultyServices.updateFaculty(facultyId, faculty);
  
   return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty is Updated successfully',
      data: result,
    });
  });


  const deleteFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(facultyId);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Faculty is deleted successfully',
      data: result,
    });
  });

export const FacultyController = {
    allFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty
}