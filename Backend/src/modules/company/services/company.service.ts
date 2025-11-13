import { Company, CompanyStatus } from '@prisma/client';
import { ICompany, ICompanyByAdminResponse, ICompanyInfoResponse } from '../interfaces/company.interface';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';

export interface ICompanyService {
  create(requestBody: ICompany, userId: number): Promise<Company>;
  getAll(): Promise<Company[]>;
  getOne(id: number): Promise<Company>;
  getAllPagination({ page, limit, filter }: any): Promise<IPaginatedResult<Company>>;
  getAllPaginationForAdmin({ page, limit, filter }: any): Promise<IPaginatedResult<Company>>;
  getMyCompanies({ page, limit, filter }: any, userId: number): Promise<IPaginatedResult<Company>>;
  getMyCompany(userId: number): Promise<Company | null>;
  getOneAdmin(id: number): Promise<ICompanyByAdminResponse | null>;
  getAllAdmin(
    page: number,
    limit: number,
    q: string,
    status?: string
  ): Promise<{ data: ICompanyByAdminResponse[]; totalDocs: number; totalPages: number; page: number; limit: number }>;
  findOne(companyId: number, userId: number): Promise<Company>;
  update(id: number, requestBody: Partial<ICompany>, userId: number): Promise<Company>;
  approved(id: number, isApproved: boolean): Promise<ICompanyInfoResponse>;
  updateStatus(id: number, status: CompanyStatus, isApproved: boolean, note?: string): Promise<ICompanyInfoResponse>;
  delete(id: number, userId: number): Promise<void>;
}
