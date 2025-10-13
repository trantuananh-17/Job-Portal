import { Company } from '@prisma/client';
import { ICompany } from '../interfaces/company.interface';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';

export interface ICompanyService {
  create(requestBody: ICompany, userId: number): Promise<Company>;
  getAll(): Promise<Company[]>;
  getOne(id: number): Promise<Company>;
  getAllPagination({ page, limit, filter }: any): Promise<IPaginatedResult<Company>>;
  getAllPaginationForAdmin({ page, limit, filter }: any): Promise<IPaginatedResult<Company>>;
  getMyCompanies({ page, limit, filter }: any, userId: number): Promise<IPaginatedResult<Company>>;
  getMyCompany(userId: number): Promise<Company | null>;
  getOneAdmin(id: number): Promise<Company>;
  findOne(companyId: number, userId: number): Promise<Company>;
  update(id: number, requestBody: Partial<ICompany>, userId: number): Promise<Company>;
  approved(id: number, isApproved: boolean): Promise<Company>;
  delete(id: number, userId: number): Promise<void>;
}
