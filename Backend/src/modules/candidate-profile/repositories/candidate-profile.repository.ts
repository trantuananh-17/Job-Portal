import { CandidateProfile } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';
import { ICandidateProfile } from '../interfaces/candidate-profile.interface';

export interface ICandidateProfileRepository extends IBaseRepository<CandidateProfile> {
  getExistProfile(userId: number): Promise<CandidateProfile | null>;
  updateOpenToWorkStatus(id: number, openToWork: boolean): Promise<CandidateProfile>;
  createCandidateProfile(data: ICandidateProfile, userId: number): Promise<CandidateProfile>;
}
