import { Types } from 'mongoose';
import { TUserName } from '../student/student.interface';
export type TAdmins = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted: boolean;
};
