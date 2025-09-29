import { CandidateExperience } from '@prisma/client';
import { ICandidateExperience } from '../../interfaces/candidate-experience.interface';
import { ICandidateExperienceService } from '../candidate-experience.service';
import { ICandidateExperienceRepository } from '../../repositories/candidate-experience.repository';
import { ICandidateProfileService } from '../candidate-profile.service';
import { NotFoundException } from '~/global/core/error.core';
import { candidateProfileService } from './candidate-profile.service.impl';
import { candidateExperienceRepository } from '../../repositories/implements/candidate-experience.repository.impl';

class CandidateExperienceService implements ICandidateExperienceService {
  constructor(
    private readonly candidateExperienceRepository: ICandidateExperienceRepository,
    private readonly candidateProfileService: ICandidateProfileService
  ) {}

  public async create(requestBody: ICandidateExperience, userId: number): Promise<CandidateExperience> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const candidateExperience = await this.candidateExperienceRepository.createCandidateExperience(
      requestBody,
      candidateProfile.id
    );

    return candidateExperience;
  }

  public async getAll(): Promise<CandidateExperience[]> {
    const candidateExperiences = await this.candidateExperienceRepository.findAll();

    return candidateExperiences;
  }

  public async getMyExperiences(userId: number): Promise<CandidateExperience[]> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const candidateExperiences = await this.candidateExperienceRepository.getMyExperiences(candidateProfile.id);

    return candidateExperiences;
  }

  public async findOne(id: number, userId: number): Promise<CandidateExperience> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const candidateExperience = await this.candidateExperienceRepository.getOne(id, candidateProfile.id);

    if (!candidateExperience) {
      throw new NotFoundException(`Not found candidate experience with ID: ${id}`);
    }

    return candidateExperience;
  }

  public async update(
    id: number,
    requestBody: Partial<ICandidateExperience>,
    userId: number
  ): Promise<CandidateExperience> {
    await this.findOne(id, userId);

    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const candidateExperience = await this.candidateExperienceRepository.updateCandidateExperience(
      id,
      requestBody,
      candidateProfile.id
    );

    return candidateExperience;
  }

  public async delete(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId);
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    await this.candidateExperienceRepository.deleteExperience(id, candidateProfile.id);
  }
}

export const candidateExperienceService: ICandidateExperienceService = new CandidateExperienceService(
  candidateExperienceRepository,
  candidateProfileService
);
