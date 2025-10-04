import { CandidateSkill } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface ICandidateSkillRepository extends IBaseRepository<CandidateSkill> {
  createCandidateSkill(candidateProfileId: number, skillName: string): Promise<CandidateSkill>;
  findMySkills(candidateProfileId: number): Promise<CandidateSkill[]>;
  findCandidateSkill(candidateProfileId: number, skillName: string): Promise<CandidateSkill | null>;
  deleteCandidateSkill(candidateProfileId: number, skillName: string): Promise<boolean>;
}
