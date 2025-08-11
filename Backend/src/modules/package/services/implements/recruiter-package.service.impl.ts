import { RecruiterPackage } from '@prisma/client';
import { IRecruiterPackageService } from '../recruiter-package.service';
import { recruiterPackageRepository } from '../../repositories/implements/recruiter-package.repository.impl';
import { NotFoundException } from '~/global/core/error.core';

class RecruiterPackageService implements IRecruiterPackageService {
  async findOne(recruiterId: number): Promise<RecruiterPackage> {
    const recruiterPackage = await recruiterPackageRepository.findOne(recruiterId);

    if (!recruiterPackage) throw new NotFoundException('Cannot find recruiter package of current user');

    return recruiterPackage;
  }
}

export const recruiterPackageService: IRecruiterPackageService = new RecruiterPackageService();
