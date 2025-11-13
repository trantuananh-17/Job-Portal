import { Company, CompanyStatus } from '@prisma/client';
import {
  ICompany,
  ICompanyApporvedMessage,
  ICompanyByAdminResponse,
  ICompanyInfoResponse
} from '../../interfaces/company.interface';
import { ICompanyService } from '../company.service';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { NotFoundException } from '~/global/core/error.core';
import { ICompanyRepository } from '../../repositories/company.repository';
import { companyRepository } from '../../repositories/implements/company.repository.impl';
import { channel } from '~/server';
import { publishDirectMessage } from '~/queues/producer';

class CompanyService implements ICompanyService {
  constructor(private readonly companyRepository: ICompanyRepository) {}

  async getAllAdmin(
    page: number,
    limit: number,
    q: string,
    status?: string
  ): Promise<{ data: ICompanyByAdminResponse[]; totalDocs: number; totalPages: number; page: number; limit: number }> {
    const [companies, totalDocs] = await Promise.all([
      this.companyRepository.getAllAdmin(page, limit, q, status as CompanyStatus),
      this.companyRepository.getTotalCompanyByAdmin(q, status as CompanyStatus)
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const data: ICompanyByAdminResponse[] = companies;

    return {
      data,
      totalDocs,
      totalPages,
      page,
      limit
    };
  }

  public async getMyCompany(userId: number): Promise<Company | null> {
    const company = await this.companyRepository.getMyCompany(userId);

    if (!company) {
      throw new NotFoundException('Your company could not be found.');
    }

    return company;
  }

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

  public async getOneAdmin(id: number): Promise<ICompanyByAdminResponse | null> {
    const company = await this.companyRepository.getCompanyByAdmin(id);

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

  public async approved(id: number, isApproved: boolean): Promise<ICompanyInfoResponse> {
    await this.getOneAdmin(id);

    const approvedCompany = await this.companyRepository.updateApproved(id, isApproved);

    if (approvedCompany.isApproved === true) {
      const messageDetails: ICompanyApporvedMessage = {
        companyName: approvedCompany.name,
        username: approvedCompany.user.name || undefined,
        createdAt: `${new Date()}`,
        receiverEmail: approvedCompany.user.email,
        subject: 'Công ty của bạn đã được kích hoạt!',
        header: 'Công ty của bạn đã được kích hoạt!',
        message: `Chúng tôi đã kích hoạt hồ sơ công ty <b>${approvedCompany.name}</b> của bạn.  Bạn có thể truy cập trang quản lý công ty để tiếp tục đăng tuyển.`
      };

      await publishDirectMessage(
        channel,
        'job-company-notification',
        'company-approved-email',
        JSON.stringify(messageDetails),
        'Approved order details sent to users service.'
      );
    }

    if (approvedCompany.isApproved === false) {
      const messageDetails: ICompanyApporvedMessage = {
        companyName: approvedCompany.name,
        username: approvedCompany.user.name || undefined,
        createdAt: `${new Date().toISOString()}`,
        receiverEmail: approvedCompany.user.email,
        subject: 'Tài khoản công ty của bạn đã bị tạm khóa',
        header: 'Công ty của bạn tạm thời không hoạt động',
        message: `Chúng tôi rất tiếc phải thông báo rằng hồ sơ công ty <b>${approvedCompany.name}</b> đã bị <b>tạm khóa</b>.  <br /><br /> Nguyên nhân có thể do hồ sơ chưa đầy đủ, vi phạm quy định hoặc cần xác minh lại thông tin.  <br /><br />Nếu bạn cho rằng đây là nhầm lẫn, vui lòng liên hệ đội ngũ hỗ trợ để được để được xem xét và hướng dẫn khôi phục tài khoản. `
      };

      await publishDirectMessage(
        channel,
        'job-company-notification',
        'company-approved-email',
        JSON.stringify(messageDetails),
        'Approved order details sent to users service.'
      );
    }

    return approvedCompany;
  }

  public async updateStatus(
    id: number,
    status: CompanyStatus,
    isApproved: boolean,
    note?: string
  ): Promise<ICompanyInfoResponse> {
    await this.getOneAdmin(id);

    const company = await this.companyRepository.updateStatus(id, status, isApproved);

    if (company.status === 'ACTIVE') {
      const messageDetails: ICompanyApporvedMessage = {
        companyName: company.name,
        username: company.user.name || undefined,
        createdAt: `${new Date().toISOString()}`,
        receiverEmail: company.user.email,
        subject: 'Công ty của bạn đã được duyệt!',
        header: 'Chúc mừng, công ty của bạn đã được duyệt!'
      };

      await publishDirectMessage(
        channel,
        'job-company-notification',
        'company-approved-email',
        JSON.stringify(messageDetails),
        'Approved order details sent to users service.'
      );
    }

    if (company.status === 'REJECTED') {
      const messageDetails: ICompanyApporvedMessage = {
        companyName: company.name,
        username: company.user.name || undefined,
        createdAt: `${new Date().toISOString()}`,
        receiverEmail: company.user.email,
        subject: 'Công ty của bạn không đủ yêu cầu để duyệt!',
        header: 'Xin lỗi, công ty của bạn không đủ yêu cầu để duyệt!',
        message: `Chúng tôi thông báo rằng hồ sơ công ty <b>${company.name}</b> của bạn không đủ điều kiện phê duyệt. Với lí do: <i>${note || 'Không đủ yêu cầu, thông tin không hợp lệ.'}</i> Bạn có thể truy cập trang quản lý công ty để cập nhật lại thông tin.`
      };

      await publishDirectMessage(
        channel,
        'job-company-notification',
        'company-approved-email',
        JSON.stringify(messageDetails),
        'Approved order details sent to users service.'
      );
    }

    return company;
  }

  public async delete(id: number, userId: number): Promise<void> {
    await this.getOneAdmin(id);

    await this.companyRepository.deleteCompany(id, userId);
  }
}

export const companyService: ICompanyService = new CompanyService(companyRepository);
