import { CandidateLanguages, CandidateProfile, Level } from '@prisma/client';
import { ICandidateLanguage } from '../../interfaces/candidate-language.interface';
import { candidateLanguageRepository } from '../../repositories/implements/candidate-language.repository.impl';
import { ICandidateLanguagesService } from '../candidate-language.service';
import { candidateProfileService } from './candidate-profile.service.impl';

class CandidateLanguageSerive implements ICandidateLanguagesService {
  public async create(userId: number, requestBody: ICandidateLanguage): Promise<CandidateLanguages> {
    const { languageName, level } = requestBody;
    const candidateProfile: CandidateProfile = await candidateProfileService.getOneByUserId(userId);

    const data = {
      candidateProfileId: candidateProfile.id,
      languageName,
      level
    };

    const candidateLanguage = await candidateLanguageRepository.create(data);

    return candidateLanguage;
  }

  public async getAll(): Promise<CandidateLanguages[]> {
    const candidateLanguages: CandidateLanguages[] = await candidateLanguageRepository.findAll();

    return candidateLanguages;
  }

  public async getMyLanguage(userId: number): Promise<CandidateLanguages[] | []> {
    const candidateProfile: CandidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateLanguages: CandidateLanguages[] = await candidateLanguageRepository.getAllMyLanguages(
      candidateProfile.id
    );

    return candidateLanguages;
  }

  public async updateLevel(userId: number, languageName: string, level: Level): Promise<CandidateLanguages> {
    const candidateProfile: CandidateProfile = await candidateProfileService.getOneByUserId(userId);

    const candidateLanguageUpdated: CandidateLanguages = await candidateLanguageRepository.updateLevel(
      candidateProfile.id,
      languageName,
      level
    );

    return candidateLanguageUpdated;
  }

  public async deleteLanguage(userId: number, languageName: string): Promise<void> {
    const candidateProfile: CandidateProfile = await candidateProfileService.getOneByUserId(userId);

    await candidateLanguageRepository.deleteLanguage(candidateProfile.id, languageName);
  }
}

export const candidateLanguageSerive: ICandidateLanguagesService = new CandidateLanguageSerive();
