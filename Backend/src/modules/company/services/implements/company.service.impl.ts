import { Company } from '@prisma/client';
import { ICompany } from '../../interfaces/company.interface';
import { ICompanyService } from '../company.service';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { companyRepository } from '../../repositories/implements/company.repository.impl';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { NotFoundException } from '~/global/core/error.core';

class CompanyService implements ICompanyService {
  public async create(requestBody: ICompany, userId: number): Promise<Company> {
    const company = await companyRepository.createCompany(requestBody, userId);

    return company;
  }

  public async getAll(): Promise<Company[]> {
    const companies = companyRepository.getAll();
    return companies;
  }

  public async getOne(id: number): Promise<Company> {
    const company = await companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException(`Cannot find company with id: ${id}`);
    }

    return company;
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

  public async getOneAdmin(id: number): Promise<Company> {
    const company = await companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException(`Cannot find company with id: ${id}`);
    }
    return company;
  }

  public async findOne(companyId: number, userId: number): Promise<Company> {
    const company = await companyRepository.getOne(companyId, userId);

    if (!company) {
      throw new NotFoundException(`Cannot find company ${companyId} of user ${userId}`);
    }

    return company;
  }

  public async update(id: number, requestBody: Partial<ICompany>, userId: number): Promise<Company> {
    await this.findOne(id, userId);

    const company = await companyRepository.updateCompany(id, requestBody, userId);

    console.log(company);

    return company;
  }

  public async approved(id: number, isApproved: boolean): Promise<Company> {
    await this.getOneAdmin(id);

    const company = await companyRepository.updateApproved(id, isApproved);

    return company;
  }

  public async delete(id: number, userId: number): Promise<void> {
    await this.getOneAdmin(id);

    await companyRepository.deleteCompany(id, userId);
  }
}

export const companyService: ICompanyService = new CompanyService();
