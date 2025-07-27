import bcrypt from 'bcrypt';
import 'dotenv/config';
import { ConflictException, UnauthorizedException } from '~/global/core/error.core';
import prisma from '~/prisma';
import { generateAccessToken, generateRefreshToken } from '~/global/helpers/token.helper';
import { IUser, IUserSignUp } from '../interfaces/user.interface';
import { userRepository } from '../Repository/user.repository';
import { ITokenResponse } from '../interfaces/auth.interface';

class AuthService {
  public async signUp(requestBody: IUserSignUp): Promise<ITokenResponse> {
    const { name, email, password } = requestBody;

    const hash = await bcrypt.hash(password, 10);

    const userByEmail = await userRepository.findUserByEmail(email);

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

    const accessToken = generateAccessToken(user);
    const refressToken = generateRefreshToken(user);

    return { access_token: accessToken, refresh_token: refressToken };
  }

  public async signIn(requestBody: IUser): Promise<ITokenResponse> {
    const { email, password } = requestBody;

    const userByEmail = await userRepository.findUserByEmail(email);

    if (!userByEmail) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    const isMatchPassword = await bcrypt.compare(password, userByEmail.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
    }

    const accessToken = generateAccessToken(userByEmail);
    const refressToken = generateRefreshToken(userByEmail);

    return { access_token: accessToken, refresh_token: refressToken };
  }
}

export const authService: AuthService = new AuthService();
