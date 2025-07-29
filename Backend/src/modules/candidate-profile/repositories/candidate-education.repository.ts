import { CandidateEducation } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { IUpdateCandidateEducation } from '../interfaces/candidate-education.interface';

export interface ICandidateEducationRepository extends IBaseRepository<CandidateEducation> {
  findByProfileId(profileId: number): Promise<CandidateEducation[]>;

  updateCandidateEducation(
    candidateProfileId: number,
    educationId: number,
    data: Partial<IUpdateCandidateEducation>
  ): Promise<CandidateEducation>;

  deleteCandidateEducation(educationId: number, candidateProfileId: number): Promise<boolean>;
}
