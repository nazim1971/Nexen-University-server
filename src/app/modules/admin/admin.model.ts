
import { model, Schema } from "mongoose";
import { TUserName } from "../student/student.interface";
import { AppError } from "../../errors/AppError";
import { Query } from "mongoose";
import { TAdmins } from "./admin.interface";


const adminNameSchema = new Schema<TUserName>({
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      trim: true,
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last Name is required'],
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
  });

  const adminSchema = new Schema<TAdmins>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'User',
      },
      designation: {
        type: String,
        required: true,
      },
      name: adminNameSchema,
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
      },
      dateOfBirth: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      emergencyContactNo: {
        type: String,
        required: true,
      },
      presentAddress: {
        type: String,
        required: true,
      },
      permanentAddress: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        required: false,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    })



    //Hooks
adminSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isFacultyExist = await Admin.findOne(query);
    if (isFacultyExist?.isDeleted === true || !isFacultyExist) {
      throw new AppError(404, 'This Admin is not exist!!');
    }
    next();
  });
    //Query middlewire

function excludeDeleted(this: Query<unknown, Document>, next: Function) {
    this.find({ isDeleted: { $ne: true } });
    if (!this) {
      throw new AppError(404, 'This Admin is not found!!');
    }
    next();
  }
  
  adminSchema.pre('find', excludeDeleted);
  adminSchema.pre('findOne', excludeDeleted);
  adminSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });
  

    export const Admin = model<TAdmins>('Admin', adminSchema);