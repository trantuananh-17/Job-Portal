import { CandidateSkill } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface ICandiateSkillRepository extends IBaseRepository<CandidateSkill> {
  createCandidateSkill(candidateProfileId: number, skillName: string): Promise<CandidateSkill>;

  deleteCandidateSkill(candidateProfileId: number, skillName: string): Promise<boolean>;
}
