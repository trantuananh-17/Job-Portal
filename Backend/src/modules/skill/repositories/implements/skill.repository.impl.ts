import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ISkillRepository } from '../skill.repository';
import { PrismaClient, Skill } from '@prisma/client';
import prisma from '~/prisma';

class SkilRepository extends BaseRepository<Skill> implements ISkillRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.skill);
  }

  async findByName(name: string): Promise<Skill | null> {
    const skill: Skill | null = await this.prisma.skill.findUnique({ where: { name } });

    return skill;
  }
}

export const skillRepository: ISkillRepository = new SkilRepository(prisma);
