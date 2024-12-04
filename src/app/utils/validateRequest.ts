import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";


export const validateMiddlewire = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      //VALIDATION check
      //if everything all right next() ->
      try {
        //console.log(req.body);
        await schema.parseAsync(req.body);
         next();
      } catch (error) {
        next(error);
      }
    };
  };