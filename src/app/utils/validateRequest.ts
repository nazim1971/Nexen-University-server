import { AnyZodObject, ZodType } from "zod";
import { catchAsync } from "./catchAsync";


export const validateMiddlewire = ( schema: ZodType | AnyZodObject) => {
    return catchAsync(async (req, res, next) => {
        await schema.parseAsync(req.body);
         next();
    })
  };