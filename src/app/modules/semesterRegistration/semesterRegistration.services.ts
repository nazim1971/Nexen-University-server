import { academicSemester } from './../academmicSemester.ts/academicSemester.model';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemesters = payload?.academicSemester;

  //check if there any registered semester tha are a;ready "upcoming" | "ongoing"
  const isAnyUpOngoingSem = await SemesterRegistration.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });

  if (isAnyUpOngoingSem) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already ${isAnyUpOngoingSem.status} registered semester`,
    );
  }

  //check if the semester is Exist
  const isAcademicSemesterExists =
    await academicSemester.findById(academicSemesters);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !!!',
    );
  }

  //check if the semester is already registered
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemesters,
  });

  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester already Registered !!!',
    );
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationFromDB = async (
  payload: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    payload,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (id:string , payload: Partial<TSemesterRegistration>) => {
  
     // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

   //if the requested semester registration is ended , we will not update anything
   const currentSemesterStatus = isSemesterRegistrationExists?.status;
   const requestedStatus = payload?.status;
 
   if (currentSemesterStatus === RegistrationStatus.ENDED) {
     throw new AppError(
       httpStatus.BAD_REQUEST,
       `This semester is already ${currentSemesterStatus}`,
     );
   }

    // if the requested is ended m we will not update
    const reqSemStatus = await SemesterRegistration.findById(id);
    if(reqSemStatus?.status === 'ENDED'){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `There registered semester is ${reqSemStatus.status} `,
          );
    }
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
