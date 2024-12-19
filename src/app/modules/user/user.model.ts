import { model, Schema } from 'mongoose';
import { Tuser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<Tuser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt:{
      type: Date
    }
    ,
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // const user = this; // doc
  // hashing password and save into DB
  this.password = await bcrypt.hash(this.password, Number(config.slat));
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({
    id,
  }).select('+password');
};

// Static method to check if passwords match
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<Tuser, UserModel>('User', userSchema);
