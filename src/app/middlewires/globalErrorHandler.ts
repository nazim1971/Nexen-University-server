import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next,
) => {

  //setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'something is wrong';


  let errorSourses: TErrorSource = [
    {
      path: '',
      message: 'something is wrong',
    }
  ]

  const handleZodError =(err : ZodError)=>{
    const errorSources : TErrorSource = err.issues.map((issue:ZodIssue)=>{
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      }
    })
    const statusCode = 400;
    return {
      statusCode,
      message: 'Zod Validation Error',
      errorSources
    }
  }

  if(err instanceof ZodError){
   const simplifiedError = handleZodError(err);

   message = 'Ami Zod Error'
 }
  
  return res.status(statusCode).json({
    success: false,
    message,
    errorSourses,
    amiErr: err.issues
  });

 
 
};


export default globalErrorHandler;