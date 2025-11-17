import { PrismaClient, Role, User } from '@prisma/client';
import { IUserRepository } from '../user.repository';
import { ICreateUser, IUpdateUserByAdmin, IUserResponseByAdmin } from '../../interfaces/user.interface';
import prisma from '~/prisma';

class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(user: ICreateUser): Promise<User> {
    const { name, email, password, role, isActive, isVerified } = user;
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        role: role as Role,
        isActive,
        isVerified
      }
    });
  }

  async getAllByAdmin(
    page: number,
    limit: number,
    q?: string,
    active?: boolean,
    verified?: boolean,
    role?: string
  ): Promise<{ data: IUserResponseByAdmin[]; total: number }> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: {
          role: { not: Role.ADMIN },
          ...(active !== undefined ? { isActive: active } : {}),
          ...(verified !== undefined ? { isVerified: verified } : {}),
          ...(role ? { role: role as Role } : {}),
          ...(q
            ? {
                name: {
                  contains: q.trim(),
                  mode: 'insensitive'
                }
              }
            : {})
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          isVerified: true,
          isDeleted: true,
          avatarKey: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true
        }
      }),
      this.prisma.user.count({
        where: {
          role: { not: Role.ADMIN },
          ...(active !== undefined ? { isActive: active } : {}),
          ...(verified !== undefined ? { isVerified: verified } : {}),
          ...(role ? { role: role as Role } : {}),
          ...(q
            ? {
                name: {
                  contains: q.trim(),
                  mode: 'insensitive'
                }
              }
            : {})
        }
      })
    ]);

    return { data, total };
  }

  async getTotalDocs(q?: string, active?: boolean, verified?: boolean, role?: string): Promise<number> {
    return await this.prisma.user.count({
      where: {
        role: { not: Role.ADMIN },
        ...(active !== undefined ? { isActive: active } : {}),
        ...(verified !== undefined ? { isVerified: verified } : {}),
        ...(role ? { role: role as Role } : {}),
        ...(q
          ? {
              name: {
                contains: q.trim(),
                mode: 'insensitive'
              }
            }
          : {})
      }
    });
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email }
    });
  }

  public async getUserUnique(userId: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId }
    });
  }

  async updateUserByAdmin(userId: number, requestBody: Partial<IUpdateUserByAdmin>): Promise<User> {
    const { isActive, isVerified, role } = requestBody;
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        role: role as Role,
        isActive,
        isVerified
      }
    });
  }

  async softDelete(userId: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isDeleted: true
      }
    });
  }
}

export const userRepository: IUserRepository = new UserRepository(prisma);
