import { Package, Prisma } from '@prisma/client';
import { IPackage, IPackageResponseByAdmin } from '../interfaces/package.interface';

export interface IPackageService {
  create(requestBody: IPackage): Promise<Package>;
  getAllByAdmin(
    page: number,
    limit: number
  ): Promise<{ data: IPackageResponseByAdmin[]; totalDocs: number; totalPages: number; page: number; limit: number }>;
  getOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package>;
  update(id: number, requestBody: Partial<IPackage>): Promise<Package>;
  updateActive(id: number, isActive: boolean): Promise<Package>;
}
