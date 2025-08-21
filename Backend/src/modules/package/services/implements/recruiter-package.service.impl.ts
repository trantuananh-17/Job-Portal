import { RecruiterPackage } from '@prisma/client';
import { BadRequestException, NotFoundException } from '~/global/core/error.core';
import { orderService } from '~/modules/order/services/implements/order.service.impl';
import { recruiterPackageRepository } from '../../repositories/implements/recruiter-package.repository.impl';
import { IRecruiterPackageService } from '../recruiter-package.service';
import { packageService } from './package.service.impl';

class RecruiterPackageService implements IRecruiterPackageService {
  async create(packageId: number, userId: number): Promise<RecruiterPackage> {
    const now = new Date();
    const startDate = new Date(now);
    const clonedStartDate = new Date(now);
    const endDate = new Date(clonedStartDate.setMonth(clonedStartDate.getMonth() + 1));

    let existing: RecruiterPackage | null = null;
    try {
      existing = await this.findOne(userId);
    } catch (e) {
      existing = null;
    }

    await packageService.readOne(packageId, { isActive: true });

    if (existing && existing.endDate > now) {
      throw new BadRequestException('You cannot buy this package');
    }

    const data = {
      packageId,
      startDate,
      endDate
    };

    const recruiterPackage = await recruiterPackageRepository.createRecruiterPackage(data, userId);

    await orderService.create(packageId, userId);

    return recruiterPackage;
  }

  async findOne(recruiterId: number): Promise<RecruiterPackage> {
    const recruiterPackage = await recruiterPackageRepository.findOne(recruiterId);

    if (!recruiterPackage) throw new NotFoundException('Cannot find recruiter package of current user');

    return recruiterPackage;
  }
}

export const recruiterPackageService: IRecruiterPackageService = new RecruiterPackageService();
