import { NextFunction, Request, Response } from 'express';
import ErrorWithStatus from './ErrorWithStatus';

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
