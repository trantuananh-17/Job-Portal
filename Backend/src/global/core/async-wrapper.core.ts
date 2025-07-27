import { NextFunction, Request, Response } from 'express';

function asyncWrapper(callback: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch((error: any) => next(error));
  };
}

export default asyncWrapper;
