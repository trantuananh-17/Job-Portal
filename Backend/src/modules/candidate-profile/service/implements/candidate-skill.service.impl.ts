import { CandidateSkill, Skill } from '@prisma/client';
import { ICreateCandidateSkill } from '../../interfaces/candidate-skill.interface';
import { ICandidateSkillService } from '../candidate-skill.service';
import { candidateProfileService } from './candidate-profile.service.impl';
import { skillService } from '~/modules/skill/services/implements/skill.service.impl';
import { candidateSkillRepository } from '../../repositories/implements/candidate-skill.repository.impl';
import { ConflictException, NotFoundException } from '~/global/core/error.core';
import { ICandidateProfileService } from '../candidate-profile.service';
import { ISkillService } from '~/modules/skill/services/skill.service';
import { ICandidateSkillRepository } from '../../repositories/candidate-skill.repository';

class CandidateSkillService implements ICandidateSkillService {
  constructor(
    private readonly candidateProfileService: ICandidateProfileService,
    private readonly skillService: ISkillService,
    private readonly candidateSkillRepository: ICandidateSkillRepository
  ) {}

  public async create(requestBody: ICreateCandidateSkill, userId: number): Promise<CandidateSkill> {
    const { skillName } = requestBody;

    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    await this.skillService.findSkill(skillName);

    await this.checkExistCandidateSkillCreate(candidateProfile.id, skillName);

    const candidateSkill = await this.candidateSkillRepository.createCandidateSkill(candidateProfile.id, skillName);

    return candidateSkill;
  }

  public async findAll(): Promise<CandidateSkill[]> {
    const candidateSkills = await this.candidateSkillRepository.findAll();

    return candidateSkills;
  }

  public async findMySkills(userId: number): Promise<CandidateSkill[]> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const candidateSkills = await this.candidateSkillRepository.findMySkills(candidateProfile.id);

    return candidateSkills;
  }

  public async delete(skillName: string, userId: number): Promise<void> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    await this.checkExistCandidateSkillDelete(candidateProfile.id, skillName);

    await this.candidateSkillRepository.deleteCandidateSkill(candidateProfile.id, skillName);
  }

  private async checkExistCandidateSkillCreate(candidateProfileId: number, skillName: string): Promise<void> {
    const existCandidateSkill = await this.candidateSkillRepository.findCandidateSkill(candidateProfileId, skillName);

    if (existCandidateSkill) {
      throw new ConflictException('Ứng viên đã có kĩ năng này');
    }
  }

  private async checkExistCandidateSkillDelete(candidateProfileId: number, skillName: string): Promise<void> {
    const existCandidateSkill = await this.candidateSkillRepository.findCandidateSkill(candidateProfileId, skillName);

    if (!existCandidateSkill) {
      throw new NotFoundException('Ứng viên không có kĩ năng này');
    }
  }
}

export const candidateSkillService: ICandidateSkillService = new CandidateSkillService(
  candidateProfileService,
  skillService,
  candidateSkillRepository
);
