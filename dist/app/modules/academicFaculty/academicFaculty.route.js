"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../utils/validateRequest");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const router = express_1.default.Router();
router.post('/create-academic-faculty', (0, validateRequest_1.validateMiddlewire)(academicFaculty_validation_1.AcademicFacultyValidation.academicFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyController.createAcademicFaculty);
router.get('/:facultyId', academicFaculty_controller_1.AcademicFacultyController.singleAcademicFaculty);
router.get('/', academicFaculty_controller_1.AcademicFacultyController.allAcademicFaculty);
router.patch('/:facultyId', (0, validateRequest_1.validateMiddlewire)(academicFaculty_validation_1.AcademicFacultyValidation.updateAcademicFacultyValidationSchema), academicFaculty_controller_1.AcademicFacultyController.updateAcademicFaculty);
exports.AcademicFacultyRoutes = router;
