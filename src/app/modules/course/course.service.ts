import mongoose from 'mongoose';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async () => {
  const result = await Course.find().populate('preRequisiteCourses.course');
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const updateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...restOfData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updatedCourse = await Course.findByIdAndUpdate(id, restOfData, {
      new: true,
      runValidators: true,
      session,
    });

    if (!updatedCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
    //check if any prerquisitecourses

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter out the deleted prerewui
      const deletedPreRequisitecours = preRequisiteCourses
        .filter((i) => i.course && i.isDeleted)
        .map((i) => i.course);

      const deletedPreCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisitecours } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      //filter out the new courses
      const newPreRequisites = preRequisiteCourses.filter(
        (i) => i.course && !i.isDeleted,
      );

      const addPreCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: newPreRequisites,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!addPreCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();
    const finalResult = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return finalResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    { upsert: true, new: true },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
  assignFacultiesWithCourseIntoDB,
};
