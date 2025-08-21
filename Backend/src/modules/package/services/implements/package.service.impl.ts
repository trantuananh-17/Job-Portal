import { Package, Prisma } from '@prisma/client';
import { IPackage } from '../../interfaces/package.interface';
import { IPackageService } from '../package.service';
import { packageRepository } from '../../repositories/implements/package.repository.impl';
import { NotFoundException } from '~/global/core/error.core';

class PackageService implements IPackageService {
  async create(requestBody: IPackage): Promise<Package> {
    const { label, price, jobPostLimit } = requestBody;

    const packageEntity = await packageRepository.create(label, price, jobPostLimit);

    return packageEntity;
  }

  async readAll(where?: Prisma.PackageWhereInput): Promise<Package[]> {
    const packages = await packageRepository.readAll(where);

    return packages;
  }

  async readOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package> {
    const packageEntity = await packageRepository.readOne(id, where);

    if (!packageEntity) {
      throw new NotFoundException(`Package: ${id} not found`);
    }

    return packageEntity;
  }

  async update(id: number, requestBody: Partial<IPackage>): Promise<Package> {
    await this.readOne(id);

    const packageEntity = await packageRepository.update(id, requestBody);

    return packageEntity;
  }

  async updateActive(id: number, isActive: boolean): Promise<Package> {
    await this.readOne(id);

    const packageEntity = await packageRepository.updateActive(id, isActive);

    return packageEntity;
  }
}

export const packageService: IPackageService = new PackageService();
