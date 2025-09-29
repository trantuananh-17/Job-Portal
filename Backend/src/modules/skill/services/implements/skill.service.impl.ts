import { skillRepository } from './../../repositories/implements/skill.repository.impl';
import { Skill } from '@prisma/client';
import { ISkillService } from '../skill.service';
import { NotFoundException } from '~/global/core/error.core';
import { ISkillRepository } from '../../repositories/skill.repository';

class SkillService implements ISkillService {
  constructor(private readonly skillRepository: ISkillRepository) {}

  public async findSkill(name: string): Promise<Skill> {
    const skill = await this.skillRepository.findByName(name);

    if (!skill) {
      throw new NotFoundException(`Không tìm thấy thông tin kĩ năng ${name}`);
    }

    return skill;
  }
}

export const skillService: ISkillService = new SkillService(skillRepository);
