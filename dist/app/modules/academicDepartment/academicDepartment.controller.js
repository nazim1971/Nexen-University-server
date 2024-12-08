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
exports.AcademicDepartmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsync_1 = require("../../utils/catchAsync");
const academicDepartment_service_1 = require("./academicDepartment.service");
const createAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Academic Department is created successfully',
        data: result,
    });
}));
const singleAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { DepartmentId } = req.params;
    const result = yield academicDepartment_service_1.AcademicDepartmentService.getSingleAcademicDepartment(DepartmentId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Academic Department is revert successfully',
        data: result,
    });
}));
const allAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.AcademicDepartmentService.getAllAcademicDepartmentFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Academic Department is revert successfully',
        data: result,
    });
}));
const updateAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { DepartmentId } = req.params;
    const result = yield academicDepartment_service_1.AcademicDepartmentService.updateAcademicDepartment(DepartmentId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Academic Department is Updated successfully',
        data: result,
    });
}));
exports.AcademicDepartmentController = {
    createAcademicDepartment,
    singleAcademicDepartment,
    allAcademicDepartment,
    updateAcademicDepartment
};
