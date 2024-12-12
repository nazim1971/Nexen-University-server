import  httpStatus  from 'http-status';
import { AppError } from '../../errors/AppError';
import { academicSemester } from '../academmicSemester.ts/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  //check if the semester is Exist
  const academicSemesters = payload?.academicSemester;
  const isAcademicSemesterExists =
    await academicSemester.findById(academicSemesters);
    if(!isAcademicSemesterExists){
        throw new AppError(httpStatus.NOT_FOUND, "This academic semester not found !!!" )
    }
};

const getAllSemesterRegistrationFromDB = async () => {};
const getSingleSemesterRegistrationFromDB = async () => {};
const updateSemesterRegistrationFromDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB,
};
