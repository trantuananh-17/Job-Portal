import { Request, Response, NextFunction } from 'express';
import prisma from '~/prisma';
import { ForbiddenException } from '../core/error.core';

export function permission(model: any, foreignField: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id; // user hiện tại (từ middleware auth gắn vào req)
    const userRole = req.user.role; // role của user hiện tại
    const entityId = parseInt(req.params.id); // id profile cần truy cập từ URL

    try {
      const entity = await (prisma[model] as any).findUnique({
        where: { id: entityId }
      });

      if (!entity) {
        return res.status(404).json({ message: 'Không tìm thấy hồ sơ ứng viên' });
      }

      if (userRole === 'ADMIN' || userRole === 'RECRUITER' || userId === entity[foreignField]) {
        return next();
      }

      return next(new ForbiddenException('Bạn không có quyền truy cập chức năng này'));
    } catch (error) {
      next(error);
    }
  };
}
