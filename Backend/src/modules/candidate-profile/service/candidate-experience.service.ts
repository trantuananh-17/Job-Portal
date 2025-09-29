import { CandidateExperience } from '@prisma/client';
import { ICandidateExperience } from '../interfaces/candidate-experience.interface';

export interface ICandidateExperienceService {
  create(requestBody: ICandidateExperience, userId: number): Promise<CandidateExperience>;
  getAll(): Promise<CandidateExperience[]>;
  getMyExperiences(userId: number): Promise<CandidateExperience[]>;
  findOne(id: number, userId: number): Promise<CandidateExperience>;
  update(id: number, requestBody: Partial<ICandidateExperience>, userId: number): Promise<CandidateExperience>;
  delete(id: number, userId: number): Promise<void>;
}
