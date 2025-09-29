import { Industry } from '@prisma/client';

export interface IIndustryRepository {
  findIndustry(industryName: string): Promise<Industry | null>;
}
