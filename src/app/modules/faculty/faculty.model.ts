
import { model, Schema } from "mongoose";
import { TUserName } from "../student/student.interface";
import { TFaculty } from "./faculty.interface";
import { AppError } from "../../errors/AppError";
import { Query } from "mongoose";


const facultyNameSchema = new Schema<TUserName>({
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

  const facultySchema = new Schema<TFaculty>(
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
      name: facultyNameSchema,
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
      academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty', 
        required: true,
      },
      academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment', 
        required: true,
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
facultySchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isFacultyExist = await Faculty.findOne(query);
    if (isFacultyExist?.isDeleted === true || !isFacultyExist) {
      throw new AppError(404, 'This Faculty is not exist!!');
    }
    next();
  });
    //Query middlewire

function excludeDeleted(this: Query<unknown, Document>, next: Function) {
    this.find({ isDeleted: { $ne: true } });
    if (!this) {
      throw new AppError(404, 'This Faculty is not found!!');
    }
    next();
  }
  
  facultySchema.pre('find', excludeDeleted);
  facultySchema.pre('findOne', excludeDeleted);
  facultySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });
  

    export const Faculty = model<TFaculty>('Faculty', facultySchema);