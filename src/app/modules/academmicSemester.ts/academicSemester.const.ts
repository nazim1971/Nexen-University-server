import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';
import { TacademicSemesterCodeMapper } from './academicSemester.validation';

export const academicSemesterMonths: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterNames: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCodes: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterCodeMapper: TacademicSemesterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const AcademicSemesterSearchableFields = ['name', 'year'];