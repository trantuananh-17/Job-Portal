import { Industry, PrismaClient } from '@prisma/client';
import { IIndustryRepository } from '../industry.repository';
import prisma from '~/prisma';

class IndustryRepository implements IIndustryRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findIndustry(industryName: string): Promise<Industry | null> {
    return await this.prisma.industry.findUnique({
      where: { name: industryName }
    });
  }
}

export const industryRepository: IIndustryRepository = new IndustryRepository(prisma);
