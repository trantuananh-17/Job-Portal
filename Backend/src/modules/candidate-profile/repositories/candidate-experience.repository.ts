import { CandidateExperience } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { ICandidateExperience } from '../interfaces/candidate-experience.interface';

export interface ICandidateExperienceRepository extends IBaseRepository<CandidateExperience> {
  createCandidateExperience(data: ICandidateExperience, candidateProfileId: number): Promise<CandidateExperience>;
  getMyExperiences(candidateProfileId: number): Promise<CandidateExperience[]>;
  getOne(id: number, candidateProfileId: number): Promise<CandidateExperience | null>;
  updateCandidateExperience(
    id: number,
    data: Partial<ICandidateExperience>,
    candidateProfileId: number
  ): Promise<CandidateExperience>;
  deleteExperience(id: number, candidateProfileId: number): Promise<boolean>;
}
