import { Package, Prisma } from '@prisma/client';
import { IPackage, IPackageResponseByAdmin } from '../interfaces/package.interface';

export interface IPackageRepository {
  create(label: string, price: number, jobPostLimit: number): Promise<Package>;
  getAllByAdmin(page: number, limit: number): Promise<{ data: IPackageResponseByAdmin[]; total: number }>;
  readOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package | null>;
  update(id: number, requestBody: Partial<IPackage>): Promise<Package>;
  updateActive(id: number, isActive: boolean): Promise<Package>;
}
