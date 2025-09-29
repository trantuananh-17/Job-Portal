import { CandidateEducation } from '@prisma/client';
import { ICandidateEducation, IUpdateCandidateEducation } from '../../interfaces/candidate-education.interface';
import { ICandidateEducationService } from '../candidate-education.service';
import { ICandidateProfileService } from '../candidate-profile.service';
import { ICandidateEducationRepository } from '../../repositories/candidate-education.repository';
import { IEducationService } from '~/modules/education/services/education.service';
import { candidateProfileService } from './candidate-profile.service.impl';
import { candidateEducationRepository } from '../../repositories/implements/candidate-education.repository.impl';
import { educationService } from '~/modules/education/services/implements/education.service.impl';

class CandidateEducationService implements ICandidateEducationService {
  constructor(
    private readonly candidateProfileService: ICandidateProfileService,
    private readonly candidateEducationRepository: ICandidateEducationRepository,
    private readonly educationService: IEducationService
  ) {}

  public async create(requestBody: ICandidateEducation, userId: number): Promise<CandidateEducation> {
    const { educationId, degree, major, yearStart, yearEnd } = requestBody;

    await this.educationService.findEducation(educationId);

    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const data: CandidateEducation = {
      candidateProfileId: candidateProfile.id,
      educationId,
      major,
      degree,
      yearStart,
      yearEnd
    };

    return await this.candidateEducationRepository.create(data);
  }

  public async getAll(): Promise<CandidateEducation[]> {
    return await this.candidateEducationRepository.findAll();
  }

  public async getMyEducations(userId: number): Promise<CandidateEducation[]> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    return await this.candidateEducationRepository.findByProfileId(candidateProfile.id);
  }

  public async update(
    educationId: number,
    requestBody: Partial<IUpdateCandidateEducation>,
    userId: number
  ): Promise<CandidateEducation> {
    await this.educationService.findEducation(educationId);

    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    return await this.candidateEducationRepository.updateCandidateEducation(
      candidateProfile.id,
      educationId,
      requestBody
    );
  }

  public async delete(educationId: number, userId: number): Promise<void> {
    await this.educationService.findEducation(educationId);

    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    await this.candidateEducationRepository.deleteCandidateEducation(educationId, candidateProfile.id);
  }
}

export const candidateEducationService: ICandidateEducationService = new CandidateEducationService(
  candidateProfileService,
  candidateEducationRepository,
  educationService
);
