import { Course } from './course.model';

const createCourse = async () => {
  const result = await Course.create();
  return result;
};

const getAllCourseFromDB = async () => {
  const result = await Course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
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

export const CourseServices = {
  createCourse,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
