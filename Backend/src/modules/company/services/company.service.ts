import { Company, CompanyStatus } from '@prisma/client';
import { ICompany, ICompanyByAdminResponse, ICompanyInfoResponse, IMyCompany } from '../interfaces/company.interface';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';

export interface ICompanyService {
  create(requestBody: ICompany, userId: number): Promise<Company>;
  getAll(): Promise<Company[]>;
  getOne(id: number): Promise<Company>;
  getMyCompany(userId: number): Promise<IMyCompany | null>;
  getOneAdmin(id: number): Promise<ICompanyByAdminResponse | null>;
  getAllAdmin(
    page: number,
    limit: number,
    q: string,
    status?: string
  ): Promise<{ data: ICompanyByAdminResponse[]; totalDocs: number; totalPages: number; page: number; limit: number }>;
  findOne(companyId: number, userId: number): Promise<Company>;
  update(id: number, requestBody: Partial<ICompany>, userId: number): Promise<Company>;
  updateDeleted(id: number, isDeleted: boolean): Promise<ICompanyInfoResponse>;
  updateStatus(id: number, status: CompanyStatus, note?: string): Promise<ICompanyInfoResponse>;
  delete(id: number, userId: number): Promise<void>;
}
