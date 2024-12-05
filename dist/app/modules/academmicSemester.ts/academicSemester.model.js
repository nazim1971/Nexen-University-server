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
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_const_1 = require("./academicSemester.const");
const academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: academicSemester_const_1.academicSemesterNames,
        required: true,
    },
    code: {
        type: String,
        enum: academicSemester_const_1.academicSemesterCodes,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: academicSemester_const_1.academicSemesterMonths,
        required: true,
    },
    endMonth: {
        type: String,
        enum: academicSemester_const_1.academicSemesterMonths,
        required: true,
    },
}, {
    timestamps: true,
});
academicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExists = yield exports.academicSemester.findOne({
            name: this.name,
            year: this.year,
        });
    });
});
exports.academicSemester = (0, mongoose_1.model)('AcademicSemester', academicSemesterSchema);
