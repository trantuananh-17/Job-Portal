import { RecruiterPackage } from '@prisma/client';

export interface IRecruiterPackageService {
  findOne(recruiterId: number): Promise<RecruiterPackage>;
}
