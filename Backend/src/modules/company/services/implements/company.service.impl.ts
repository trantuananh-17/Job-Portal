import { Company, CompanyStatus } from '@prisma/client';
import {
  ICompany,
  ICompanyApporvedMessage,
  ICompanyByAdminResponse,
  ICompanyInfoResponse,
  IMyCompany
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

  public async getMyCompany(userId: number): Promise<IMyCompany | null> {
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

  // Xóa mềm company
  public async updateDeleted(id: number, isDeleted: boolean): Promise<ICompanyInfoResponse> {
    await this.getOneAdmin(id);

    const deletedCompany = await this.companyRepository.updateDeleted(id, isDeleted);

    if (deletedCompany.isDeleted === true) {
      const messageDetails: ICompanyApporvedMessage = {
        companyName: deletedCompany.name,
        username: deletedCompany.user.name || undefined,
        createdAt: `${new Date()}`,
        receiverEmail: deletedCompany.user.email,
        subject: 'Công ty của bạn đã bị xóa!',
        header: 'Công ty của bạn đã bị xóa!',
        message: `Chúng tôi đã xóa hồ sơ công ty <b>${deletedCompany.name}</b> của bạn. Việc xóa này có thể được thực hiện do vi phạm chính sách sử dụng của nền tảng. <br /><br /> Nếu bạn cần xem xét lại hoặc muốn khôi phục hồ sơ, vui lòng liên hệ đội ngũ hỗ trợ để được hướng dẫn.`
      };

      await publishDirectMessage(
        channel,
        'job-company-notification',
        'company-approved-email',
        JSON.stringify(messageDetails),
        'Deleted Company By Admin.'
      );
    }

    if (deletedCompany.isDeleted === false) {
      const messageDetails: ICompanyApporvedMessage = {
        companyName: deletedCompany.name,
        username: deletedCompany.user.name || undefined,
        createdAt: `${new Date().toISOString()}`,
        receiverEmail: deletedCompany.user.email,
        subject: 'Tài khoản công ty của bạn đã được khôi phục',
        header: 'Công ty của bạn đã được khôi phục',
        message: ` Hồ sơ công ty <b>${deletedCompany.name}</b> đã được <b>khôi phục và kích hoạt trở lại</b>. <br /><br />Bạn có thể tiếp tục đăng tuyển và sử dụng các chức năng của hệ thống. <br /><br />Nếu bạn cần hỗ trợ thêm trong quá trình sử dụng, vui lòng liên hệ đội ngũ hỗ trợ của chúng tôi. <br /><br /> `
      };

      await publishDirectMessage(
        channel,
        'job-company-notification',
        'company-approved-email',
        JSON.stringify(messageDetails),
        'Revert Company By Admin.'
      );
    }

    return deletedCompany;
  }

  public async updateStatus(id: number, status: CompanyStatus, note?: string): Promise<ICompanyInfoResponse> {
    await this.getOneAdmin(id);

    const company = await this.companyRepository.updateStatus(id, status);

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
        'Update active company.'
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
        'Update reject company.'
      );
    }

    if (company.status === 'INACTIVE') {
      const messageDetails: ICompanyApporvedMessage = {
        companyName: company.name,
        username: company.user.name || undefined,
        createdAt: `${new Date().toISOString()}`,
        receiverEmail: company.user.email,
        subject: 'Công ty của bạn đã bị khóa!',
        header: 'Thông báo, công ty của bạn đã bị khóa!',
        message: `Chúng tôi thông báo rằng hồ sơ công ty <b>${company.name}</b> của bạn đã bị khóa. Với lí do: <i>${note || 'vi phạm nội quy sử dụng.'}</i> Bạn có thể liên hệ tới bộ phận hỗ trợ để yêu cầu xem xét lại và khôi phục lại hồ sơ.`
      };

      await publishDirectMessage(
        channel,
        'job-company-notification',
        'company-approved-email',
        JSON.stringify(messageDetails),
        'Update inactive company.'
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
