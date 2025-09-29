import { Package, Prisma } from '@prisma/client';
import { IPackage } from '../interfaces/package.interface';

export interface IPackageService {
  create(requestBody: IPackage): Promise<Package>;
  readAll(where?: Prisma.PackageWhereInput): Promise<Package[]>;
  readOne(id: number, where?: Prisma.PackageWhereInput): Promise<Package>;
  update(id: number, requestBody: Partial<IPackage>): Promise<Package>;
  updateActive(id: number, isActive: boolean): Promise<Package>;
}
