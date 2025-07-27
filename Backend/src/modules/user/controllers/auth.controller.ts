import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import HttpStatus from '~/global/constants/http.constant';

class AuthController {
  public async signUp(req: Request, res: Response) {
    const accessToken = await authService.signUp(req.body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Đăng ký thành công',
      access_token: accessToken
    });
  }
}

export const authController: AuthController = new AuthController();
