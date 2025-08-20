import { RecruiterPackage } from '@prisma/client';
import { IRecruiterPackageRepository } from '../recruiter-package.repository';
import prisma from '~/prisma';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IRecruiterPackage } from '../../interfaces/recruiter-package.interface';

class RecruiterPackageRepository extends BaseRepository<RecruiterPackage> implements IRecruiterPackageRepository {
  constructor() {
    super(prisma.recruiterPackage);
  }
  async createRecruiterPackage(data: IRecruiterPackage, userId: number): Promise<RecruiterPackage> {
    const { endDate, packageId, startDate } = data;
    return await prisma.recruiterPackage.create({
      data: {
        packageId,
        recruiterId: userId,
        startDate,
        endDate
      }
    });
  }

  async findOne(recruiterId: number): Promise<RecruiterPackage | null> {
    return await prisma.recruiterPackage.findFirst({
      where: {
        recruiterId
      }
    });
  }
}

export const recruiterPackageRepository: IRecruiterPackageRepository = new RecruiterPackageRepository();
