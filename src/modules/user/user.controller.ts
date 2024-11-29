import { Request, Response } from "express";
import { UserService } from "./user.service";


const createStudent = async (req: Request, res: Response) => {
    try {
      const {password, student: studentData} = req.body;
  
      // Data validation  using zod
      //const zodParseData = studentValidationSchema.parse(student);
  
      const result = await UserService.createStudentIntoDB(password, studentData);
  
      res.status(201).json({
        success: true,
        message: 'Student is created successfully',
        data: result,
      });
    } catch (err) {
      const error = err as Error;
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
    }
  };

 export const UserController = {
    createStudent
  }