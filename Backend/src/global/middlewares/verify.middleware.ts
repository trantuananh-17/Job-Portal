import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../core/error.core';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export async function verify(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return next(new UnauthorizedException('Vui lòng đăng nhập để thực hiện'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    const { id, email, name, role } = decoded;

    req.user = { id, email, name, role };

    next();
  } catch (error) {
    return next(new UnauthorizedException('Vui lòng đăng nhập để thực hiện'));
  }
}
