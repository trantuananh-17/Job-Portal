import { Company } from '@prisma/client';
import { ICompany } from '../../interfaces/company.interface';
import { ICompanyService } from '../company.service';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { NotFoundException } from '~/global/core/error.core';
import { ICompanyRepository } from '../../repositories/company.repository';
import { companyRepository } from '../../repositories/implements/company.repository.impl';

class CompanyService implements ICompanyService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  public async create(requestBody: ICompany, userId: number): Promise<Company> {
    return await this.companyRepository.createCompany(requestBody, userId);
  }

  public async getAll(): Promise<Company[]> {
    return await this.companyRepository.getAll();
  }

  public async getOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findById(id);

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
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException(`Cannot find company with id: ${id}`);
    }

    return company;
  }

  public async findOne(companyId: number, userId: number): Promise<Company> {
    const company = await this.companyRepository.getOne(companyId, userId);

    if (!company) {
      throw new NotFoundException(`Cannot find company ${companyId} of user ${userId}`);
    }

    return company;
  }

  public async update(id: number, requestBody: Partial<ICompany>, userId: number): Promise<Company> {
    await this.findOne(id, userId);

    return await this.companyRepository.updateCompany(id, requestBody, userId);
  }

  public async approved(id: number, isApproved: boolean): Promise<Company> {
    await this.getOneAdmin(id);

    return await this.companyRepository.updateApproved(id, isApproved);
  }

  public async delete(id: number, userId: number): Promise<void> {
    await this.getOneAdmin(id);

    await this.companyRepository.deleteCompany(id, userId);
  }
}

export const companyService: ICompanyService = new CompanyService(companyRepository);
