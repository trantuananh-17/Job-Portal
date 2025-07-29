import { CandidateLanguages, Level } from '@prisma/client';
import { ICandidateLanguage } from '../interfaces/candidate-language.interface';

export interface ICandidateLanguagesService {
  create(userId: number, requestBody: ICandidateLanguage): Promise<CandidateLanguages>;
  getAll(): Promise<CandidateLanguages[]>;
  getMyLanguage(userId: number): Promise<CandidateLanguages[] | []>;
  updateLevel(userId: number, languageName: string, level: Level): Promise<CandidateLanguages>;
  deleteLanguage(userId: number, languageName: string): Promise<void>;
}
