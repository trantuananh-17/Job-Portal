import jwt from 'jsonwebtoken';
import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { SignUp, User } from '../interfaces/user.interface';
import { ConflictException, NotFoundException } from '~/global/core/error.core';

class AuthService {
  public async signUp(requestBody: SignUp): Promise<string> {
    const { name, email, password } = requestBody;

    const hash = await bcrypt.hash(password, 10);

    const userByEmail = await prisma.user.findFirst({
      where: { email }
    });

    if (userByEmail) {
      throw new ConflictException('Email đã được đăng ký');
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash
      }
    });

    const accessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h'
      }
    );

    return accessToken;
  }

  public async signIn(requestBody: User) {
    const { email, password } = requestBody;

    const userByEmail = await prisma.user.findFirst({
      where: { email }
    });

    if (!userByEmail) {
      throw new NotFoundException('Thông tin đăng nhập không chính xác');
    }
  }
}

export const authService: AuthService = new AuthService();
