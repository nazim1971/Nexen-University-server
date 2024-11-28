
import { TStudent } from "./student.interface";
import { Student } from "./student.model";


const createStudentIntoDB = async (studentData: TStudent) => {
    //   // Build in Static method
    if (await Student.isUserExist(studentData.id)) {
      throw new Error('User Already exist');
    }
    const result = await Student.create(studentData);
  
    return result;
  
  };

const getAllStudentsFromDB = async () => {
    const result = await Student.find();
    return result;
  };
  
  const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.aggregate([{ $match: { id } }]);
    return result;
  };
  
  const deleteStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
  };
  
  export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    createStudentIntoDB
  };