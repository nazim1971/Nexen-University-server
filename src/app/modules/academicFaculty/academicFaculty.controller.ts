import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';


const createAcademicFaculty = catchAsync(async (req, res) => {
  
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(req.body)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Academic Faculty is created successfully',
      data: result,
    });
})

const singleAcademicFaculty = catchAsync(async(req,res)=>{
  const {facultyId} = req.params;
  const result = await AcademicFacultyService.getSingleAcademicFaculty(facultyId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is revert successfully',
    data: result,
  });
})

const allAcademicFaculty = catchAsync(async(req,res)=>{
  
  const result = await AcademicFacultyService.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is revert successfully',
    data: result,
  });
})

const updateAcademicFaculty = catchAsync(async(req,res)=>{
  const {facultyId} = req.params;

  const result =  await AcademicFacultyService.updateAcademicFaculty(facultyId,req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is Updated successfully',
    data: result,
  });
})

export const AcademicSemesterController = {
  createAcademicFaculty,
  singleAcademicFaculty,
  allAcademicFaculty,
  updateAcademicFaculty
};
