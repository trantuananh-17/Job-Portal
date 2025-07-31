import { CandidateSkill } from '@prisma/client';
import { ICreateCandidateSkill } from '../interfaces/candidate-skill.interface';

export interface ICandidateSkillService {
  create(requestBody: ICreateCandidateSkill, userId: number): Promise<CandidateSkill>;
  findAll(): Promise<CandidateSkill[]>;
  findMySkills(userId: number): Promise<CandidateSkill[]>;
  delete(skillName: string, userId: number): Promise<void>;
}
