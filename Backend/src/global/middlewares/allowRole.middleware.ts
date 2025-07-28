import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '../core/error.core';

export function allowRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenException('Bạn không có quyền truy cập chức năng này'));
    }

    return next();
  };
}
