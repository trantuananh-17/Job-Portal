import { CompanyImage } from '@prisma/client';

export interface ICompanyImageService {
  addImages(companyId: number, userId: number, files: Express.Multer.File[]): Promise<void>;
  getAll(companyId: number): Promise<CompanyImage[]>;
  findOne(companyId: number, companyImageId: number): Promise<CompanyImage>;
  delete(companyId: number, userId: number, companyImageId: number): Promise<void>;
}
