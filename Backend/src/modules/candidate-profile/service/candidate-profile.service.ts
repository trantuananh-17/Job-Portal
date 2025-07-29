import { CandidateProfile } from '@prisma/client';
import { ICandidateProfile } from '../interfaces/candidate-profile.interface';

export interface ICandidateProfileService {
  create(requestBody: ICandidateProfile, userId: number): Promise<CandidateProfile>;
  getAll(): Promise<CandidateProfile[] | []>;
  getOne(id: number): Promise<CandidateProfile>;
  update(id: number, requestBody: Partial<ICandidateProfile>): Promise<CandidateProfile>;
  changeOpenToWorkStatus(id: number): Promise<void>;
  delete(id: number): Promise<void>;
}
