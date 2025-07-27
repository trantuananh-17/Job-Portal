import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await userService.getAll();

    res.status(200).json({
      message: 'Get all users successfully',
      data: users
    });
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      message: 'Tạo người dùng thành công',
      data: user
    });
  }
}

export const userController: UserController = new UserController();
