import { Apply, ApplyStatus } from '@prisma/client';

export interface IApplyRepository {
  createApply(candidateProfileId: number, jobId: number): Promise<Apply>;
  updateStatusApply(candidateProfileId: number, jobId: number, status: ApplyStatus): Promise<Apply>;
  getOne(candidateProfileId: number, jobId: number): Promise<Apply | null>;
  updateCv(candidateProfileId: number, jobId: number, cv: string): Promise<Apply>;
}
