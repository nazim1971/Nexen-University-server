import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";


export const validateMiddlewire = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      //VALIDATION check
      //if everything all right next() ->
      try {
        await schema.parseAsync({
          body: req.body,
        });
        return next();
      } catch (error) {
        next(error);
      }
    };
  };