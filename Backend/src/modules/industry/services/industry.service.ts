import { Industry } from '@prisma/client';
import { industryRepository } from '../repositories/implements/industry.repostory.impl';
import { NotFoundException } from '~/global/core/error.core';

class IndustrySerivce {
  async findIndustry(industryName: string): Promise<Industry> {
    const industry = await industryRepository.findIndustry(industryName);

    if (!industry) {
      throw new NotFoundException(`Industry ${industryName} not found`);
    }

    return industry;
  }
}

export const industryService: IndustrySerivce = new IndustrySerivce();
