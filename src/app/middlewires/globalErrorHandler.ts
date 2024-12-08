import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

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

  type TErrorSource ={
    path: string | number;
    message: string;
  } []

  const errorSourses: TErrorSource = [
    {
      path: '',
      message: 'something is wrong',
    }
  ]

  if(err instanceof ZodError){
    statusCode = 400;
    message= 'Ami error'
 }
  
  return res.status(statusCode).json({
    success: false,
    message,
    errorSourses,
    amiErr: err.issues
  });

 
 
};


export default globalErrorHandler;