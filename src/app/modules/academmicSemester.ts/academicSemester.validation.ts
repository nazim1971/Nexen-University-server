import { z } from 'zod';
import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterNames,
} from './academicSemester.const';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.enum(
      academicSemesterNames as [
        TAcademicSemesterName,
        ...TAcademicSemesterName[],
      ],
    ),
    code: z.enum(
      academicSemesterCodes as [
        TAcademicSemesterCode,
        ...TAcademicSemesterCode[],
      ],
    ),
    year: z.date(),
    startMonth: z.enum(academicSemesterMonths as [TMonths, ...TMonths[]]),
    endMonth: z.enum(academicSemesterMonths as [TMonths, ...TMonths[]]),
  }),
});

export const AcademicSemesterValitions = {
  createAcademicValidationSchema,
};
