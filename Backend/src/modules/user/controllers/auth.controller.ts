import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { sendTokenToCookie } from '~/global/helpers/cookie.helper';
import { authService } from '../services/implements/auth.service.impl';
import { IAuthService } from '../services/auth.service';

class AuthController {
  constructor(private readonly authService: IAuthService) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getProfileUser = this.getProfileUser.bind(this);
  }
  public async signUp(req: Request, res: Response) {
    const token = await this.authService.signUp(req.body);

    sendTokenToCookie(res, 'access_token', token.access_token, 1000 * 60 * 60);

    sendTokenToCookie(res, 'refresh_token', token.refresh_token, 1000 * 60 * 60 * 24 * 7);

    return res.status(HttpStatus.CREATED).json({
      message: 'Đăng ký thành công',
      data: token
    });
  }

  public async signIn(req: Request, res: Response) {
    const token = await this.authService.signIn(req.body);

    sendTokenToCookie(res, 'access_token', token.access_token, 1000 * 60 * 60);

    sendTokenToCookie(res, 'refresh_token', token.refresh_token, 1000 * 60 * 60 * 24 * 7);

    return res.status(HttpStatus.OK).json({
      message: 'Đăng nhập thành công',
      data: token
    });
  }

  public async getProfileUser(req: Request, res: Response) {
    return res.status(HttpStatus.OK).json({
      message: 'Lấy thông tin người dùng thành công',
      data: req.user
    });
  }
}

export const authController: AuthController = new AuthController(authService);
