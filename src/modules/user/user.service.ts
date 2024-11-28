import config from '../../config';
import { TStudent } from '../student/student.interface';
import { TnewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   // Build in Static method
  // if (await Student.isUserExist(studentData.id)) {
  //   throw new Error('User Already exist');
  // }

  let user: TnewUser = {};

  //if psssword is not give , use deafult password

  user.password = password || config.password as string  



  user.role = 'student';

  const result = await User.create(password, studentData);

  return result;
};

export const UserService = {
  createStudentIntoDB,
};
