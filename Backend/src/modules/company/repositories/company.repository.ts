import { Company } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICompany } from '../interfaces/company.interface';

export interface ICompanyRepository extends BaseRepository<Company> {
  createCompany(data: ICompany, userId: number): Promise<Company>;
}
