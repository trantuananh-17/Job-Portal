import { userRepository } from './../../Repository/implements/user.repository.impl';
import { Role, User } from '@prisma/client';
import { ICreateUser, IUpdateUserByAdmin, IUserResponse, IUserResponseByAdmin } from '../../interfaces/user.interface';
import { IUserService } from '../user.service';
import { IUserRepository } from '../../Repository/user.repository';
import { ConflictException, NotFoundException } from '~/global/core/error.core';

class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(req: ICreateUser): Promise<User> {
    const userByEmail = await this.userRepository.findUserByEmail(req.email);

    if (userByEmail) {
      throw new ConflictException('Email đã được đăng ký');
    }
    const user = await this.userRepository.createUser(req);

    return user;
  }

  async getAll(
    page: number,
    limit: number,
    q?: string,
    active?: boolean,
    verified?: boolean,
    role?: string
  ): Promise<{ data: IUserResponseByAdmin[]; totalDocs: number; totalPages: number; page: number; limit: number }> {
    const { data, total } = await this.userRepository.getAllByAdmin(page, limit, q, active, verified, role as Role);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      totalDocs: total,
      totalPages,
      page,
      limit
    };
  }

  async getUserUnique(userId: number): Promise<User | null> {
    const user = await this.userRepository.getUserUnique(userId);

    if (!user) throw new NotFoundException('Nguời dùng không tồn tại.');

    return user;
  }

  async updateUserByAdmin(userId: number, requestBody: Partial<IUpdateUserByAdmin>): Promise<User> {
    await this.getUserUnique(userId);

    const updated = await this.updateUserByAdmin(userId, requestBody);

    return updated;
  }

  async softDelete(userId: number): Promise<User> {
    await this.getUserUnique(userId);

    const deleted = await this.softDelete(userId);

    return deleted;
  }
}

export const userService: IUserService = new UserService(userRepository);
