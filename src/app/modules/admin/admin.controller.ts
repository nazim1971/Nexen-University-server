import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../errors/AppError";
import { AdminServices } from "./admin.services";


const allAdmin = catchAsync(async(req,res)=>{
    const result=  await AdminServices.getAllAdminFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admin is revert successfully',
        data: result,
      });
})

  const getSingleAdmin = catchAsync(async (req, res,next) => {
    const { adminId } = req.params;
    const result = await AdminServices.getSingleAdmin(adminId);
    if (!result) {
      return next(new AppError(404, 'This Admin is not found!'));
    }
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Single Admin are retrieved successfully',
      data: result,
    });
  });
  
  const updateAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const {admin} = req.body;
    const result = await AdminServices.updateAdmin(adminId, admin);
  
   return sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin is Updated successfully',
      data: result,
    });
  });


  const deleteAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const result = await AdminServices.deleteAdminFromDB(adminId);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin is deleted successfully',
      data: result,
    });
  });

export const AdminController = {
    allAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin
}