
import { Model } from "mongoose";

export interface Tuser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};


export interface UserModel extends Model<Tuser>{
  isUserExistByCustomId(id:string): Promise<Tuser>
}
