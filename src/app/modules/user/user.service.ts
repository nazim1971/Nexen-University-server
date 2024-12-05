import { TAcademicSemester } from './../academmicSemester.ts/academicSemester.interface';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { academicSemester } from '../academmicSemester.ts/academicSemester.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (
  password: string = config.password,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<Tuser> = {};

  //if psssword is not give , use deafult password

  userData.password = password;

  userData.role = 'student';


  const admissionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser?.id;
    payload.user = newUser?._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
