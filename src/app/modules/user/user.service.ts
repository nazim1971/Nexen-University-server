import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { Tuser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password:  string = config.password, studentData: TStudent) => {

  // create a user object
  const userData: Partial<Tuser> = {};

  //if psssword is not give , use deafult password

  userData.password = password 

  userData.role = 'student';

  // set manuaaly generated id
  userData.id = '20302106939'

  //create a userData 

  

  const newUser = await User.create(userData);
  
  //create a student 
  if(Object.keys(newUser).length){
    studentData.id = newUser?.id;
    studentData.user = newUser?._id;
    
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  
};

export const UserService = {
  createStudentIntoDB,
};
