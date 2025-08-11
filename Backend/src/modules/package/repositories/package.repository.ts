import { Package, Prisma } from '@prisma/client';
import { IPackage } from '../interfaces/package.interface';

export interface IPackageRepository {
  create(label: string, price: number, jobPostLimit: number): Promise<Package>;
  readAll(where?: Prisma.PackageWhereInput): Promise<Package[]>;
  readOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package | null>;
  update(id: number, requestBody: Partial<IPackage>): Promise<Package>;
  updateActive(id: number, isActive: boolean): Promise<Package>;
}
