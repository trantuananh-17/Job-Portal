import { Company } from '@prisma/client';
import { ICompany } from '../../interfaces/company.interface';
import { ICompanyService } from '../company.service';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { companyRepository } from '../../repositories/implements/company.repository.impl';

class CompanyService implements ICompanyService {
  public async create(requestBody: ICompany, userId: number): Promise<Company> {
    const company = await companyRepository.createCompany(requestBody, userId);

    return company;
  }

  getAll(): Promise<Company[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: number): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  getAllPagination({ page, limit, filter }: any): Promise<IPaginatedResult<Company>> {
    throw new Error('Method not implemented.');
  }
  getAllPaginationForAdmin({ page, limit, filter }: any): Promise<IPaginatedResult<Company>> {
    throw new Error('Method not implemented.');
  }
  getMyCompanies({ page, limit, filter }: any, userId: number): Promise<IPaginatedResult<Company>> {
    throw new Error('Method not implemented.');
  }
  getOneAdmin(id: number): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  findOne(companyId: number, userId: number): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  update(id: number, requestBody: ICompany, userId: number): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  approved(id: number, isApproved: boolean): Promise<Company> {
    throw new Error('Method not implemented.');
  }
  delete(id: number, userId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const companyService: ICompanyService = new CompanyService();
