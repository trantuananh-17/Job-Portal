import { CandidateSkill, Skill } from '@prisma/client';
import { ICreateCandidateSkill } from '../../interfaces/candidate-skill.interface';
import { ICandidateSkillService } from '../candidate-skill.service';

class CandidateSkillService implements ICandidateSkillService {
  create(requestBody: ICreateCandidateSkill, userId: number): Promise<CandidateSkill> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<CandidateSkill[]> {
    throw new Error('Method not implemented.');
  }
  findMySkills(userId: number): Promise<CandidateSkill[]> {
    throw new Error('Method not implemented.');
  }
  delete(skillName: string, userId: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findSkill(name: string): Promise<Skill> {
    throw new Error('Method not implemented.');
  }
}

export const candidateSkillService: ICandidateSkillService = new CandidateSkillService();
