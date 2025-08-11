import { RecruiterPackage } from '@prisma/client';
import { IRecruiterPackageRepository } from '../recruiter-package.repository';
import prisma from '~/prisma';

class RecruiterPackageRepository implements IRecruiterPackageRepository {
  async findOne(recruiterId: number): Promise<RecruiterPackage | null> {
    return await prisma.recruiterPackage.findFirst({
      where: {
        recruiterId
      }
    });
  }
}

export const recruiterPackageRepository: IRecruiterPackageRepository = new RecruiterPackageRepository();
