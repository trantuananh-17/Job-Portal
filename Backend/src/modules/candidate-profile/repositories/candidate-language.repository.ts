import { CandidateLanguages, Level } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface ICandidateLanguageRepository extends IBaseRepository<CandidateLanguages> {
  getAllMyLanguages(profileId: number): Promise<CandidateLanguages[]>;
  updateLevel(candidateProfileId: number, languageName: string, level: Level): Promise<CandidateLanguages>;
  deleteLanguage(candidateProfileId: number, languageName: string): Promise<boolean>;
}
