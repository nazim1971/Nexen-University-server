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

const singleAcademicSemester = catchAsync(async(req,res)=>{
  const {semesterId} = req.params;
  const result = await AcademicSemesterServices.singleAcademicSemester(semesterId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester is revert successfully',
    data: result,
  });
})

const allAcademicSemester = catchAsync(async(req,res)=>{
  
  const result = await AcademicSemesterServices.getAllAcademicSemester();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester is revert successfully',
    data: result,
  });
})

const updateAcademicSemester = catchAsync(async(req,res)=>{
  const {semesterId} = req.params;

  const result =  await AcademicSemesterServices.updateSingleAcademicSemester(semesterId,req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester is Updated successfully',
    data: result,
  });
})

export const AcademicSemesterController = {
  createAcademicSemester,
  singleAcademicSemester,
  allAcademicSemester,
  updateAcademicSemester
};
