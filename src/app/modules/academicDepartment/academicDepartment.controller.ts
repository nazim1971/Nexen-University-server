import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';


const createAcademicDepartment = catchAsync(async (req, res) => {
  
    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Academic Department is created successfully',
      data: result,
    });
})

const singleAcademicDepartment = catchAsync(async(req,res)=>{
  const {DepartmentId} = req.params;
  const result = await AcademicDepartmentService.getSingleAcademicDepartment(DepartmentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department is revert successfully',
    data: result,
  });
})

const allAcademicDepartment = catchAsync(async(req,res)=>{
  
  const result = await AcademicDepartmentService.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department is revert successfully',
    data: result,
  });
})

const updateAcademicDepartment = catchAsync(async(req,res)=>{
  const {DepartmentId} = req.params;

  const result =  await AcademicDepartmentService.updateAcademicDepartment(DepartmentId,req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department is Updated successfully',
    data: result,
  });
})

export const AcademicDepartmentController = {
  createAcademicDepartment,
  singleAcademicDepartment,
  allAcademicDepartment,
  updateAcademicDepartment
};
