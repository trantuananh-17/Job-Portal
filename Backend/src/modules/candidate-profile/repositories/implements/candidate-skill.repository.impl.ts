import { CandidateSkill } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICandiateSkillRepository } from '../candidate-skill.repository';
import prisma from '~/prisma';

class CandidateSkillRepository extends BaseRepository<CandidateSkill> implements ICandiateSkillRepository {
  constructor() {
    super(prisma.candidateSkill);
  }

  async createCandidateSkill(candidateProfileId: number, skillName: string): Promise<CandidateSkill> {
    return await prisma.candidateSkill.create({
      data: {
        candidateProfileId,
        skillName
      }
    });
  }

  async deleteCandidateSkill(candidateProfileId: number, skillName: string): Promise<boolean> {
    const deleted = await prisma.candidateSkill.delete({
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

export const candidateSkillRepository: ICandiateSkillRepository = new CandidateSkillRepository();
