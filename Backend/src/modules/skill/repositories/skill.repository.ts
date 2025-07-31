import { Skill } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface ISkillRepository extends IBaseRepository<Skill> {
  findByName(name: string): Promise<Skill | null>;
}
