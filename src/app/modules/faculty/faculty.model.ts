
import { model, Schema } from "mongoose";
import { TUserName } from "../student/student.interface";
import { TFaculty } from "./faculty.interface";


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

    export const Faculty = model<TFaculty>('Faculty', facultySchema);