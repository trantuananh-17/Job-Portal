import { RecruiterPackage } from '@prisma/client';
import { BadRequestException, NotFoundException } from '~/global/core/error.core';
import { IRecruiterPackageService } from '../recruiter-package.service';
import { IPackageService } from '../package.service';
import { IRecruiterPackageRepository } from '../../repositories/recruiter-package.repository';
import { IOrderService } from '~/modules/order/services/order.service';
import { packageService } from './package.service.impl';
import { recruiterPackageRepository } from '../../repositories/implements/recruiter-package.repository.impl';
import { orderService } from '~/modules/order/services/implements/order.service.impl';

class RecruiterPackageService implements IRecruiterPackageService {
  constructor(
    private readonly packageService: IPackageService,
    private readonly recruiterPackageRepository: IRecruiterPackageRepository,
    private readonly orderService: IOrderService
  ) {}

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

    await this.packageService.readOne(packageId, { isActive: true });

    if (existing && existing.endDate > now) {
      throw new BadRequestException('You cannot buy this package');
    }

    const data = {
      packageId,
      startDate,
      endDate
    };

    const recruiterPackage = await this.recruiterPackageRepository.createRecruiterPackage(data, userId);

    await this.orderService.create(packageId, userId);

    return recruiterPackage;
  }

  async findOne(recruiterId: number): Promise<RecruiterPackage> {
    const recruiterPackage = await this.recruiterPackageRepository.findOne(recruiterId);

    if (!recruiterPackage) throw new NotFoundException('Cannot find recruiter package of current user');

    return recruiterPackage;
  }
}

export const recruiterPackageService: IRecruiterPackageService = new RecruiterPackageService(
  packageService,
  recruiterPackageRepository,
  orderService
);
