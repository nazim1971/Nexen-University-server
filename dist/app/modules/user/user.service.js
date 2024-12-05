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
const createStudentIntoDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (password = config_1.default.password, payload) {
    // create a user object
    const userData = {};
    //if psssword is not give , use deafult password
    userData.password = password;
    userData.role = 'student';
    const admissionSemester = yield academicSemester_model_1.academicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }
    userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
    const newUser = yield user_model_1.User.create(userData);
    //create a student
    if (Object.keys(newUser).length) {
        payload.id = newUser === null || newUser === void 0 ? void 0 : newUser.id;
        payload.user = newUser === null || newUser === void 0 ? void 0 : newUser._id;
        const newStudent = yield student_model_1.Student.create(payload);
        return newStudent;
    }
});
exports.UserService = {
    createStudentIntoDB,
};
