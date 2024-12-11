import { TCourse } from './course.interface';
import { Course } from './course.model';

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

  const result = await Course.findByIdAndUpdate( id , restOfData, {
    new: true,
    runValidators: true
  });
  //check if any prerquisitecourses 

  if(preRequisiteCourses && preRequisiteCourses.length > 0){
    //filter out the deleted prerewui
    const deletedPreRequisitecours = preRequisiteCourses.filter(i=> i.course && i.isDeleted).map(i=> i.course)

    const deletedPreCourses = await Course.findByIdAndUpdate(id,{
      $pull: {preRequisiteCourses: {course:{$in: deletedPreRequisitecours}  } },
    })
  }
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
};
