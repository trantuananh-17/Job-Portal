import { Company } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICompany } from '../interfaces/company.interface';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';

export interface ICompanyRepository extends BaseRepository<Company> {
  createCompany(data: ICompany, userId: number): Promise<Company>;
  getAll(): Promise<Company[]>;
  getMyCompanies(userId: number): Promise<Company[]>;
  getMyCompany(userId: number): Promise<Company | null>;
  getOne(companyId: number, userId: number): Promise<Company | null>;
  updateCompany(id: number, data: Partial<ICompany>, userId: number): Promise<Company>;
  updateApproved(id: number, isApproved: boolean): Promise<Company>;
  deleteCompany(id: number, userId: number): Promise<boolean>;
}
