import { RecruiterPackage } from '@prisma/client';

export interface IRecruiterPackageRepository {
  findOne(recruiterId: number): Promise<RecruiterPackage | null>;
}
