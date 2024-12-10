import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllFacultyFromDB = async () => {
  const result = await Faculty.find();
  return result;
};

const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id);
  return result;
};

const updateFaculty = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...restOfData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...restOfData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(
     id,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  //transection
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id ,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(400, 'Failed to delete Faculty');
    }

    const deletedUser = await User.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to delete Faculty');
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFaculty,
  updateFaculty,
  deleteFacultyFromDB,
};
