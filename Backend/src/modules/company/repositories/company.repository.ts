import { Company, CompanyStatus } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICompany, ICompanyByAdminResponse, ICompanyInfoResponse } from '../interfaces/company.interface';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';

export interface ICompanyRepository extends BaseRepository<Company> {
  createCompany(data: ICompany, userId: number): Promise<Company>;
  getAll(): Promise<Company[]>;
  getMyCompanies(userId: number): Promise<Company[]>;
  getMyCompany(userId: number): Promise<Company | null>;
  getOne(companyId: number, userId: number): Promise<Company | null>;
  updateCompany(id: number, data: Partial<ICompany>, userId: number): Promise<Company>;
  getAllAdmin(page: number, limit: number, q: string, status?: CompanyStatus): Promise<ICompanyByAdminResponse[]>;
  getTotalCompanyByAdmin(q: string, status?: CompanyStatus): Promise<number>;
  getCompanyByAdmin(id: number): Promise<ICompanyByAdminResponse | null>;
  updateApproved(id: number, isApproved: boolean): Promise<ICompanyInfoResponse>;
  updateStatus(id: number, status: CompanyStatus, isApproved: boolean): Promise<ICompanyInfoResponse>;
  deleteCompany(id: number, userId: number): Promise<boolean>;
}
