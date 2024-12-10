import mongoose from 'mongoose';

import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { Admin } from './admin.model';
import { TAdmins } from './admin.interface';

const getAllAdminFromDB = async () => {
  const result = await Admin.find();
  return result;
};

const getSingleAdmin = async (id: string) => {
  const result = await Admin.findOne({id});
  return result;
};

const updateAdmin = async (id: string, payload: Partial<TAdmins>) => {
  const { name, ...restOfData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...restOfData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate(
    {
     id,
    },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  //transection
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(400, 'Failed to delete Admin');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'Failed to delete Admin');
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdmin,
  updateAdmin,
  deleteAdminFromDB,
};
