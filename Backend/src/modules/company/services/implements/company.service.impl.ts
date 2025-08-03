import { Company } from '@prisma/client';
import { ICompany } from '../../interfaces/company.interface';
import { ICompanyService } from '../company.service';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { companyRepository } from '../../repositories/implements/company.repository.impl';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';

class CompanyService implements ICompanyService {
  public async create(requestBody: ICompany, userId: number): Promise<Company> {
    const company = await companyRepository.createCompany(requestBody, userId);

    return company;
  }

  public async getAll(): Promise<Company[]> {
    const companies = companyRepository.getAll();
    return companies;
  }

  getOne(id: number): Promise<Company> {
    throw new Error('Method not implemented.');
  }

  public async getAllPagination({ page, limit, filter }: any): Promise<IPaginatedResult<Company>> {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company',
      additionalCondition: { isApproved: true }
    });

    return { data, totalCounts };
  }

  public async getAllPaginationForAdmin({ page, limit, filter }: any): Promise<IPaginatedResult<Company>> {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company'
    });

    return { data, totalCounts };
  }

  public async getMyCompanies({ page, limit, filter }: any, userId: number): Promise<IPaginatedResult<Company>> {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'description'],
      entity: 'company',
      additionalCondition: { userId }
    });

    return { data, totalCounts };
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
