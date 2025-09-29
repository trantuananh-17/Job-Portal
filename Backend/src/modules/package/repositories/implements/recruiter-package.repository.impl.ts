import { PrismaClient, RecruiterPackage } from '@prisma/client';
import { IRecruiterPackageRepository } from '../recruiter-package.repository';
import prisma from '~/prisma';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { IRecruiterPackage } from '../../interfaces/recruiter-package.interface';

class RecruiterPackageRepository extends BaseRepository<RecruiterPackage> implements IRecruiterPackageRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.recruiterPackage);
  }
  async createRecruiterPackage(data: IRecruiterPackage, userId: number): Promise<RecruiterPackage> {
    const { endDate, packageId, startDate } = data;
    return await this.prisma.recruiterPackage.create({
      data: {
        packageId,
        recruiterId: userId,
        startDate,
        endDate
      }
    });
  }

  async findOne(recruiterId: number): Promise<RecruiterPackage | null> {
    return await this.prisma.recruiterPackage.findFirst({
      where: {
        recruiterId
      }
    });
  }
}

export const recruiterPackageRepository: IRecruiterPackageRepository = new RecruiterPackageRepository(prisma);
