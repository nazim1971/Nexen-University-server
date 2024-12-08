import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'


const userSchema = new Schema<Tuser>(
    {
      id: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      needPasswordChange: {
        type: Boolean,
        default: true,
      },
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
    this.password = await bcrypt.hash(
     this.password,
      Number(config.slat),
    );
    next();
  });
  
  // set '' after saving password
  userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

  export const User = model<Tuser>('User', userSchema)