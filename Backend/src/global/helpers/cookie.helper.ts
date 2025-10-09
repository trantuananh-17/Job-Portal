import { Response } from 'express';

export function sendTokenToCookie(res: Response, key: string, token: string, age: number) {
  res.cookie(key, token, {
    maxAge: age,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
}
