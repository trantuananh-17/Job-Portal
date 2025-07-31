import { Skill } from '@prisma/client';
import { ISkillService } from '../skill.service';
import { skillRepository } from '../../repositories/implements/skill.repository.impl';
import { NotFoundException } from '~/global/core/error.core';

class SkillService implements ISkillService {
  public async findSkill(name: string): Promise<Skill> {
    const skill = await skillRepository.findByName(name);

    if (!skill) {
      throw new NotFoundException(`Không tìm thấy thông tin kĩ năng ${skill}`);
    }

    return skill;
  }
}

export const skillService: ISkillService = new SkillService();
