import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterNames,
} from './academicSemester.const';
import { AppError } from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: academicSemesterCodes,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: academicSemesterMonths,
      required: true,
    },
    endMonth: {
      type: String,
      enum: academicSemesterMonths,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await academicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if(isSemesterExists){
    throw new AppError( httpStatus.CONFLICT ,'Semester is already exist')
  }
  next()
});

export const academicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
