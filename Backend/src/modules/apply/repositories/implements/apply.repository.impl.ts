import { Apply, ApplyStatus } from '@prisma/client';
import { IApplyRepository } from '../apply.repository';
import prisma from '~/prisma';
import { PrismaClient } from '@prisma/client';

class ApplyRepository implements IApplyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createApply(candidateProfileId: number, jobId: number): Promise<Apply> {
    return await this.prisma.apply.create({
      data: {
        candidateProfileId,
        jobId
      }
    });
  }
  async updateStatusApply(candidateProfileId: number, jobId: number, status: ApplyStatus): Promise<Apply> {
    return await this.prisma.apply.update({
      where: {
        candidateProfileId_jobId: {
          candidateProfileId,
          jobId
        }
      },
      data: {
        status
      }
    });
  }
  async getOne(candidateProfileId: number, jobId: number): Promise<Apply | null> {
    return await this.prisma.apply.findUnique({
      where: {
        candidateProfileId_jobId: {
          candidateProfileId,
          jobId
        }
      }
    });
  }
}

export const applyRepository: IApplyRepository = new ApplyRepository(prisma);
