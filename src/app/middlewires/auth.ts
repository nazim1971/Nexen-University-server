import config from '../config';
import { AppError } from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are no authorized');
    }

    //check if the token is valid
    jwt.verify(token, config.jwt, function (err, decoded) {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      req.user = decoded as JwtPayload
      
    });

    next();
  });
};
