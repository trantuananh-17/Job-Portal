import { RecruiterPackage } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { IRecruiterPackage } from '../interfaces/recruiter-package.interface';

export interface IRecruiterPackageRepository extends IBaseRepository<RecruiterPackage> {
  findOne(recruiterId: number): Promise<RecruiterPackage | null>;
  createRecruiterPackage(data: IRecruiterPackage, userId: number): Promise<RecruiterPackage>;
}
