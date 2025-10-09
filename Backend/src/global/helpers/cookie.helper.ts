import { Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export function sendTokenToCookie(res: Response, key: string, token: string, age: number) {
  res.cookie(key, token, {
    maxAge: age,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
}
