import { AppError } from "../../errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface"
import httpStatus from "http-status";
import EnrolledCourse from "./enrolledCourse.model";
import { Student } from "../student/student.model";

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



    const result = await EnrolledCourse.create({

    })
    
    if(!result){
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to enrolled in this course")
    }
    return result
}

export const EnrolledCourseService = {
    createEnrolledCourseInDB
}