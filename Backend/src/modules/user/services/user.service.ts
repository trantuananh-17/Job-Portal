import { User } from '@prisma/client';
import { BadRequestException, NotFoundException } from '~/global/core/error.core';
import { recuiterPackageActive } from '~/modules/package/interfaces/package.interface';
import prisma from '~/prisma';

class UserService {
  public async createUser(req: any): Promise<User> {
    const { name, email, password } = req;

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        status: true,
        role: 'CANDIDATE'
      }
    });

    return user;
  }

  public async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  public async findUserUnique(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { recruiterPackages: true }
    });

    if (!user) throw new NotFoundException('user does not exist');

    return user;
  }

  public async checkActivePackage(user: any) {
    const activePackage = user.recruiterPackages.find(
      (pkg: recuiterPackageActive) => Date.now() < new Date(pkg.endDate).getTime()
    );
    if (!activePackage) throw new BadRequestException('You must buy the package');

    return activePackage;
  }
}

export const userService: UserService = new UserService();
