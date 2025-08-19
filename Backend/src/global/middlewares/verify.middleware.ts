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

export async function verifyUserOrNot(req: Request, res: Response, next: NextFunction) {
  if (!req.headers['authorization']?.split(' ')[1]) {
    return next;
  }
  const token = req.headers['authorization']?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    const { name, email, role, id } = decoded;

    req.user = { id, name, email, role };

    return next();
  } catch (error: any) {
    return next();
  }
}
