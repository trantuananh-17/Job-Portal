import { User } from '@prisma/client';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export function generateAccessToken(user: User) {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h'
    }
  );

  return accessToken;
}

export function generateRefreshToken(user: User) {
  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: '7d'
    }
  );

  return accessToken;
}

export function clearCookieToken(token: string, res: Response) {
  return res.clearCookie(token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
}
