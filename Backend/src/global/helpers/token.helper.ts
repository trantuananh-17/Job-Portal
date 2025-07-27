import { User } from 'generated/prisma';
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
