import { Skill } from '@prisma/client';

export interface ISkillService {
  findSkill(name: string): Promise<Skill>;
}
