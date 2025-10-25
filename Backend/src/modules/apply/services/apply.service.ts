import { Apply } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { IApply } from '../interfaces/apply.interface';

export interface IApplyService {
  create(jobId: number, userId: number, cv: Express.Multer.File): Promise<Apply>;
  getByMe({ page, limit }: any, userId: number): Promise<IPaginatedResult<Apply>>;
  getByRecruiter({ page, limit }: any, jobId: number, userId: number): Promise<IPaginatedResult<Apply>>;
  updateStatus(requestBody: IApply, userId: number): Promise<Apply>;
  getOne(candidateProfileId: number, jobId: number): Promise<Apply | null>;
}
