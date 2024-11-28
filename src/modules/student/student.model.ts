import { model, Query, Schema } from 'mongoose';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father’s name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father’s occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father’s contact number is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother’s name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother’s occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother’s contact number is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  Name: {
    type: String,
    required: [true, 'Local guardian’s name is required'],
  },
  Occupation: {
    type: String,
    required: [true, 'Local guardian’s occupation is required'],
  },
  ContactNo: {
    type: String,
    required: [true, 'Local guardian’s contact number is required'],
  },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  password: {
    type: String,   
    required: [true, 'Password is required'],  
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['female', 'male'],
      message: '{VALUE} is not valid ',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        "Blood group must be one of: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'",
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  profileImage: {
    type: String,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be either active or blocked',
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
    toJSON: {
      virtuals: true,
    },
  },
);

// virtual
studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName;
  });

//Query middlewire

function excludeDeleted(this: Query<unknown, Document>,next: Function) {
    this.find({ isDeleted: { $ne: true } });
    next();
  }
 
  studentSchema.pre('find', excludeDeleted);
  studentSchema.pre('findOne', excludeDeleted);
  studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  });

  //creating a custom static method
  studentSchema.statics.isUserExist = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
  };
  

export const Student = model<TStudent, StudentModel>('Student', studentSchema);