"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const academicSemester_model_1 = require("../academmicSemester.ts/academicSemester.model");
const user_utils_1 = require("./user.utils");
const AppError_1 = require("../../errors/AppError");
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const createStudentIntoDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (password = config_1.default.password, payload) {
    // create a user object
    const userData = {};
    //if psssword is not give , use deafult password
    userData.password = password;
    userData.role = 'student';
    const admissionSemester = yield academicSemester_model_1.academicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError_1.AppError(404, 'Admission semester not found');
    }
    // session isolated area and do this in try-catch block
    const session = yield mongoose_1.default.startSession();
    try {
        //startsession transection
        session.startTransaction();
        userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
        //create a user (transection -1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a student
        //before transection new user is object now array
        if (!newUser.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;
        //Create a student Transaction -> 2
        const newStudent = yield student_model_1.Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        //end the session and transection
        yield session.commitTransaction();
        yield session.endSession();
        return newStudent;
    }
    catch (error) {
        //* ROllback the transection
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
exports.UserService = {
    createStudentIntoDB,
};
