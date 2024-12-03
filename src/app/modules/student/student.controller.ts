import {RequestHandler } from "express";
import { StudentServices } from "./student.service";


const catchAsync = fun =>{
 Promise.resolve(fun(req,res,next)).catch(err=> next(err))
}

const getAllStudent: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
})

const getSingleStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: ' Single Student are retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const deleteStudent: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err) {
   next(err)
  }
};

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
