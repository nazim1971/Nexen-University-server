"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../utils/validateRequest");
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_controller_1 = require("./academicSemester.controller");
const router = express_1.default.Router();
router.post('/create-academic-semester', (0, validateRequest_1.validateMiddlewire)(academicSemester_validation_1.AcademicSemesterValitions.createAcademicValidationSchema), academicSemester_controller_1.AcademicSemesterController.createAcademicSemester);
router.get('/:semesterId', academicSemester_controller_1.AcademicSemesterController.singleAcademicSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterController.allAcademicSemester);
router.patch('/:semesterId', (0, validateRequest_1.validateMiddlewire)(academicSemester_validation_1.AcademicSemesterValitions.updateAcademicValidationSchema), academicSemester_controller_1.AcademicSemesterController.updateAcademicSemester);
exports.AcademicSemesterRoutes = router;
