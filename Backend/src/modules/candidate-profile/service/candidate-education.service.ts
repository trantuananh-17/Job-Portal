import { CandidateEducation } from '@prisma/client';
import { ICandidateEducation, IUpdateCandidateEducation } from '../interfaces/candidate-education.interface';

export interface ICandidateEducationService {
  create(requestBody: ICandidateEducation, userId: number): Promise<CandidateEducation>;
  getAll(): Promise<CandidateEducation[]>;
  getMyEducations(userId: number): Promise<CandidateEducation[]>;
  update(
    educationId: number,
    requestBody: Partial<IUpdateCandidateEducation>,
    userId: number
  ): Promise<CandidateEducation>;
  delete(educationId: number, userId: number): Promise<void>;
}
