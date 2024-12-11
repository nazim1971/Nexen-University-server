import { model, Schema } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";
import { AppError } from "../../errors/AppError";
import { Query } from "mongoose";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credit: {
        type: Number,
        trim: true,
        required: true
    },
     isDeleted:{
        type: Boolean,
        default: false
     },
    preRequisiteCourses:[preRequisiteCoursesSchema]
})

    //Hooks
    courseSchema.pre('findOneAndUpdate', async function (next) {
        const query = this.getQuery();
        const isFacultyExist = await Course.findOne(query);
        if (isFacultyExist?.isDeleted === true || !isFacultyExist) {
          throw new AppError(404, 'This Course is not exist!!');
        }
        next();
      });
        //Query middlewire
    
    function excludeDeleted(this: Query<unknown, Document>, next: Function) {
        this.find({ isDeleted: { $ne: true } });
        if (!this) {
          throw new AppError(404, 'This Course is not found!!');
        }
        next();
      }
      
      courseSchema.pre('find', excludeDeleted);
      courseSchema.pre('findOne', excludeDeleted);
      courseSchema.pre('aggregate', function (next) {
        this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
        next();
      });
      

export const Course =  model<TCourse>("Course", courseSchema)

