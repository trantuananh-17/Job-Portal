import { CandidateEducation, Education } from '@prisma/client';
import { ICandidateEducation, IUpdateCandidateEducation } from '../../interfaces/candidate-education.interface';
import { ICandidateEducationService } from '../candidate-education.service';
import { candidateProfileService } from './candidate-profile.service.impl';
import { candidateEducationRepository } from '../../repositories/implements/candidate-education.repository.impl';
import { educationService } from '~/modules/education/services/implements/education.service.impl';

class CandidateEducationService implements ICandidateEducationService {
  public async create(requestBody: ICandidateEducation, userId: number): Promise<CandidateEducation> {
    const { educationId, degree, major, yearStart, yearEnd } = requestBody;

    await educationService.findEducation(educationId);

    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    const data: CandidateEducation = {
      candidateProfileId: candidateProfile.id,
      educationId,
      major,
      degree,
      yearStart,
      yearEnd
    };

    const candidateEducation = await candidateEducationRepository.create(data);

    return candidateEducation;
  }

  public async getAll(): Promise<CandidateEducation[]> {
    const candidateEducations = await candidateEducationRepository.findAll();

    return candidateEducations;
  }

  public async getMyEducations(userId: number): Promise<CandidateEducation[]> {
    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateEducations = await candidateEducationRepository.findByProfileId(candidateProfile.id);

    return candidateEducations;
  }

  public async update(
    educationId: number,
    requestBody: Partial<IUpdateCandidateEducation>,
    userId: number
  ): Promise<CandidateEducation> {
    await educationService.findEducation(educationId);

    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateEducation = await candidateEducationRepository.updateCandidateEducation(
      candidateProfile.id,
      educationId,
      requestBody
    );

    return candidateEducation;
  }

  public async delete(educationId: number, userId: number): Promise<void> {
    await educationService.findEducation(educationId);

    const candidateProfile = await candidateProfileService.getOneByUserId(userId);

    await candidateEducationRepository.deleteCandidateEducation(educationId, candidateProfile.id);
  }
}

export const candidateEducationService: ICandidateEducationService = new CandidateEducationService();
