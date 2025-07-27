import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import HttpStatus from '~/global/constants/http.constant';
import { sendTokenToCookie } from '~/global/helpers/cookie.helper';

class AuthController {
  public async signUp(req: Request, res: Response) {
    const token = await authService.signUp(req.body);

    sendTokenToCookie(res, 'access_token', token.access_token, 1000 * 60 * 60);

    sendTokenToCookie(res, 'refresh_token', token.refresh_token, 1000 * 60 * 60 * 24 * 7);

    return res.status(HttpStatus.CREATED).json({
      message: 'Đăng ký thành công',
      data: token
    });
  }

  public async signIn(req: Request, res: Response) {
    const token = await authService.signIn(req.body);

    sendTokenToCookie(res, 'access_token', token.access_token, 1000 * 60 * 60);

    sendTokenToCookie(res, 'refresh_token', token.refresh_token, 1000 * 60 * 60 * 24 * 7);

    return res.status(HttpStatus.OK).json({
      message: 'Đăng nhập thành công',
      data: token
    });
  }
}

export const authController: AuthController = new AuthController();
