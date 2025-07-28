import { CandidateProfile } from '@prisma/client';
import { ICandidateLanguage } from '../interfaces/candidate-language.interface';
import { candidateProfileService } from './candidate-profile.service';
import { candidateLanguageRepository } from '../repositories/implements/candidate-language.repository.impl';

class CandidateLanguageSerive {
  public async create(userId: number, requestBody: ICandidateLanguage) {
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
}

export const candidateLanguageSerive: CandidateLanguageSerive = new CandidateLanguageSerive();
