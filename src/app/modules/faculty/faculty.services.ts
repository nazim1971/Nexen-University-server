import mongoose from "mongoose";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model";
import { AppError } from "../../errors/AppError";


const getAllFacultyFromDB = async () => {
    const result = await Faculty.find();
    return result;
  };

  const getSingleFaculty = async (id: string) => {
    const result = await Faculty.findById(id);
    return result;
  };
  
  const updateFaculty = async (
    id: string,
    payload: Partial<TFaculty>,
  ) => {
    const result = await Faculty.findOneAndUpdate(
      {
        _id: id,
      },
      payload,
      {
        new: true,
      },
    );
    return result;
  };

  const deleteFacultyFromDB = async (id: string) => {
    //transection
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const deletedFaculty = await Faculty.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
  
      if (!deletedFaculty) {
        throw new AppError(400, 'Failed to delete Faculty');
      }
  
      const deletedUser = await Faculty.findOneAndUpdate(
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
      throw new AppError(400, 'Failed to create new Faculty');
    }
  };

export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFaculty,
    updateFaculty,
    deleteFacultyFromDB
}