import { NextFunction, Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { IUserService } from '../services/user.service';
import { userService } from '../services/implements/user.service.impl';

class UserController {
  constructor(private readonly userService: IUserService) {
    this.create = this.create.bind(this);
    this.updateByAdmin = this.updateByAdmin.bind(this);
    this.softDelete = this.softDelete.bind(this);
    this.getAllByAdmin = this.getAllByAdmin.bind(this);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = await this.userService.createUser(req.body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Tạo người dùng thành công',
      data: user
    });
  }

  public async getAllByAdmin(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 8, r, q, active, verified } = req.query;

    const role = r ? (r as string) : undefined;
    const isActive = active === 'true' ? true : active === 'false' ? false : undefined;
    const isVerified = verified === 'true' ? true : verified === 'false' ? false : undefined;

    const user = await this.userService.getAll(+page, +limit, q as string, isActive, isVerified, role);

    return res.status(HttpStatus.CREATED).json({
      message: 'Lấy danh sách người dùng thành công.',
      data: user
    });
  }

  public async updateByAdmin(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await this.userService.updateUserByAdmin(Number(userId), req.body);

    return res.status(HttpStatus.OK).json({
      message: 'Cập nhật người dùng thành công',
      data: user
    });
  }

  public async softDelete(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId;
    const user = await this.userService.softDelete(Number(userId));

    return res.status(HttpStatus.OK).json({
      message: 'Xóa người dùng thành công',
      data: user
    });
  }
}

export const userController: UserController = new UserController(userService);
