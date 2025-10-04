import { CandidateSkill, PrismaClient } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICandidateSkillRepository } from '../candidate-skill.repository';
import prisma from '~/prisma';

class CandidateSkillRepository extends BaseRepository<CandidateSkill> implements ICandidateSkillRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.candidateSkill);
  }

  async findCandidateSkill(candidateProfileId: number, skillName: string): Promise<CandidateSkill | null> {
    return await this.prisma.candidateSkill.findUnique({
      where: {
        candidateProfileId_skillName: {
          candidateProfileId,
          skillName
        }
      }
    });
  }

  async findMySkills(candidateProfileId: number): Promise<CandidateSkill[]> {
    return await this.prisma.candidateSkill.findMany({
      where: {
        candidateProfileId
      }
    });
  }

  async createCandidateSkill(candidateProfileId: number, skillName: string): Promise<CandidateSkill> {
    return await this.prisma.candidateSkill.create({
      data: {
        candidateProfileId,
        skillName
      }
    });
  }

  async deleteCandidateSkill(candidateProfileId: number, skillName: string): Promise<boolean> {
    const deleted = await this.prisma.candidateSkill.delete({
      where: {
        candidateProfileId_skillName: {
          candidateProfileId,
          skillName
        }
      }
    });

    return !!deleted;
  }
}

export const candidateSkillRepository: ICandidateSkillRepository = new CandidateSkillRepository(prisma);
