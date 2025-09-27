import { CandidateLanguages, CandidateProfile, Level } from '@prisma/client';
import { ICandidateLanguage } from '../../interfaces/candidate-language.interface';
import { candidateLanguageRepository } from '../../repositories/implements/candidate-language.repository.impl';
import { ICandidateLanguagesService } from '../candidate-language.service';
import { candidateProfileService } from './candidate-profile.service.impl';
import { ICandidateProfileService } from '../candidate-profile.service';
import { ICandidateLanguageRepository } from '../../repositories/candidate-language.repository';

class CandidateLanguageSerive implements ICandidateLanguagesService {
  constructor(
    private readonly candidateProfileService: ICandidateProfileService,
    private readonly candidateLanguageRepository: ICandidateLanguageRepository
  ) {}

  public async create(userId: number, requestBody: ICandidateLanguage): Promise<CandidateLanguages> {
    const { languageName, level } = requestBody;
    const candidateProfile: CandidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const data = {
      candidateProfileId: candidateProfile.id,
      languageName,
      level
    };

    const candidateLanguage = await this.candidateLanguageRepository.create(data);

    return candidateLanguage;
  }

  public async getAll(): Promise<CandidateLanguages[]> {
    const candidateLanguages: CandidateLanguages[] = await this.candidateLanguageRepository.findAll();

    return candidateLanguages;
  }

  public async getMyLanguage(userId: number): Promise<CandidateLanguages[] | []> {
    const candidateProfile: CandidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const candidateLanguages: CandidateLanguages[] = await this.candidateLanguageRepository.getAllMyLanguages(
      candidateProfile.id
    );

    return candidateLanguages;
  }

  public async updateLevel(userId: number, languageName: string, level: Level): Promise<CandidateLanguages> {
    const candidateProfile: CandidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const candidateLanguageUpdated: CandidateLanguages = await this.candidateLanguageRepository.updateLevel(
      candidateProfile.id,
      languageName,
      level
    );

    return candidateLanguageUpdated;
  }

  public async deleteLanguage(userId: number, languageName: string): Promise<void> {
    const candidateProfile: CandidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    await this.candidateLanguageRepository.deleteLanguage(candidateProfile.id, languageName);
  }
}

export const candidateLanguageSerive: ICandidateLanguagesService = new CandidateLanguageSerive(
  candidateProfileService,
  candidateLanguageRepository
);
