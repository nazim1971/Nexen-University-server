import { model, Schema } from 'mongoose';
import { TAcademicSemester} from './academicSemester.interface';
import { academicSemesterCodes, academicSemesterMonths, academicSemesterNames } from './academicSemester.const';



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
      type: Date,
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

export const academicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
