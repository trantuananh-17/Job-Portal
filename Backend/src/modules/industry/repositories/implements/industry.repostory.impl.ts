import { Industry } from '@prisma/client';
import { IIndustryRepository } from '../industry.repository';
import prisma from '~/prisma';

class IndustryRepository implements IIndustryRepository {
  async findIndustry(industryName: string): Promise<Industry | null> {
    return await prisma.industry.findUnique({
      where: { name: industryName }
    });
  }
}

export const industryRepository: IIndustryRepository = new IndustryRepository();
