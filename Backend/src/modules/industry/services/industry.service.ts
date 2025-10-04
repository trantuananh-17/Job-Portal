import { Industry } from '@prisma/client';

export interface IIndustryService {
  findIndustry(industryName: string): Promise<Industry>;
}
