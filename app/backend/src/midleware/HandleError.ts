import { NextFunction, Request, Response } from 'express';
import ErrorWithStatus from './ErrorWithCode';

class MidlewareOfError {
  static HandleError = (
    err: ErrorWithStatus,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { message, status } = err;
    console.log({ message });
    res.status(status).json({ message });
  };
}

export default MidlewareOfError;
