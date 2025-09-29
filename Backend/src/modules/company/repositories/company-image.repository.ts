import { CompanyImage } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { ICreateCompanyImage } from '../interfaces/company-image.interface';

export interface ICompanyImageRepository extends IBaseRepository<CompanyImage> {
  createMany(data: ICreateCompanyImage[]): Promise<void>;
  findMany(companyId: number): Promise<CompanyImage[]>;
  findOne(companyId: number, companyImageId: number): Promise<CompanyImage | null>;
  deleteImage(companyId: number, companyImageId: number): Promise<boolean>;
}
