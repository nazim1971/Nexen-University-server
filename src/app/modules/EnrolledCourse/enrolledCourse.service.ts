import { AppError } from "../../errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface"
import httpStatus from "http-status";
import EnrolledCourse from "./enrolledCourse.model";
import { Student } from "../student/student.model";
import mongoose from "mongoose";

const createEnrolledCourseInDB = async (userId: string, payload: TEnrolledCourse) =>{
    //step 1 - Check if the offered courses is exist
    // step 2- 

    const {offeredCourse} = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

    if(!isOfferedCourseExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Offered course is not exist')
    }

    if(isOfferedCourseExists.maxCapacity <= 0){
        throw new AppError(httpStatus.BAD_REQUEST, 'Room is full')
    }

    const student = await Student.findOne({id: userId}).select('id')

    if(!student){
        throw new AppError(httpStatus.NOT_FOUND, 'Student is not exist')
    }

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExists?.semesterRegistration,
        offeredCourse,
        student: student.id
    })

    if(!isStudentAlreadyEnrolled){
        throw new AppError(httpStatus.CONFLICT, 'Student id already enrolled')
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const result = await EnrolledCourse.create([ {
            semesterRegistration: isOfferedCourseExists.semesterRegistration,
            academicSemester: isOfferedCourseExists.academicSemester,
            academicFaculty: isOfferedCourseExists.academicFaculty,
            academicDepartment: isOfferedCourseExists.academicDepartment,
            offeredCourse: offeredCourse,
            course: isOfferedCourseExists.course,
            student: student._id,
            faculty: isOfferedCourseExists.faculty,
            isEnrolled: true,
          },], {session})
        
        if(!result){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to enrolled in this course")
        }
    
    
        const maxCapacity = isOfferedCourseExists.maxCapacity;
        await OfferedCourse.findByIdAndUpdate(offeredCourse, {
            maxCapacity: maxCapacity -1
        })
    
        await session.commitTransaction();
        await session.endSession()
    
        return result
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Bad Request')
    }

 }

export const EnrolledCourseService = {
    createEnrolledCourseInDB
}