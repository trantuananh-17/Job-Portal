import { candidateExperienceRepository } from './../../repositories/implements/candidate-experience.repository.impl';
import { CandidateExperience } from '@prisma/client';
import { ICandidateExperience } from '../../interfaces/candidate-experience.interface';
import { ICandidateExperienceService } from '../candidate-experience.service';
import { candidateProfileService } from './candidate-profile.service.impl';
import { NotFoundException } from '~/global/core/error.core';

class CandidateExperienceService implements ICandidateExperienceService {
  public async create(requestBody: ICandidateExperience, userId: number): Promise<CandidateExperience> {
    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateExperience = await candidateExperienceRepository.createCandidateExperience(
      requestBody,
      candidateProfile.id
    );

    return candidateExperience;
  }

  public async getAll(): Promise<CandidateExperience[]> {
    const candidateExperiences = await candidateExperienceRepository.findAll();

    return candidateExperiences;
  }

  public async getMyExperiences(userId: number): Promise<CandidateExperience[]> {
    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateExperiences = await candidateExperienceRepository.getMyExperiences(candidateProfile.id);

    return candidateExperiences;
  }

  public async findOne(id: number, userId: number): Promise<CandidateExperience> {
    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateExperience = await candidateExperienceRepository.getOne(id, candidateProfile.id);

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

    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateExperience = await candidateExperienceRepository.updateCandidateExperience(
      id,
      requestBody,
      candidateProfile.id
    );

    return candidateExperience;
  }

  public async delete(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId);
    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    await candidateExperienceRepository.deleteExperience(id, candidateProfile.id);
  }
}

export const candidateExperienceService: ICandidateExperienceService = new CandidateExperienceService();
