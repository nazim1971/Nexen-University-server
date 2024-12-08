"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../utils/validateRequest");
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const router = express_1.default.Router();
router.post('/create-academic-Department', (0, validateRequest_1.validateMiddlewire)(academicDepartment_validation_1.AcademicDepartmentValidation.academicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentController.createAcademicDepartment);
router.get('/:DepartmentId', academicDepartment_controller_1.AcademicDepartmentController.singleAcademicDepartment);
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.allAcademicDepartment);
router.patch('/:DepartmentId', (0, validateRequest_1.validateMiddlewire)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartment_controller_1.AcademicDepartmentController.updateAcademicDepartment);
exports.AcademicDepartmentRoutes = router;
