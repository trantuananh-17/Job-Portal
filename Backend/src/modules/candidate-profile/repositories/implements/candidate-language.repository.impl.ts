import { Level } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { ICandidateLanguageRepository } from '../candidate-language.repository';
import { CandidateLanguages } from './../../../../../node_modules/.prisma/client/index.d';

class CandidateLanguageRepository extends BaseRepository<CandidateLanguages> implements ICandidateLanguageRepository {
  constructor() {
    super(prisma.candidateLanguages);
  }
  async deleteLanguage(candidateProfileId: number, languageName: string): Promise<boolean> {
    const deleted = await prisma.candidateLanguages.delete({
      where: { candidateProfileId_languageName: { candidateProfileId, languageName } }
    });

    return !!deleted;
  }

  async updateLevel(candidateProfileId: number, languageName: string, level: Level): Promise<CandidateLanguages> {
    return await prisma.candidateLanguages.update({
      where: { candidateProfileId_languageName: { candidateProfileId, languageName } },
      data: { level }
    });
  }

  async getAllMyLanguages(profileId: number): Promise<CandidateLanguages[]> {
    return await prisma.candidateLanguages.findMany({
      where: { candidateProfileId: profileId }
    });
  }
}

export const candidateLanguageRepository: ICandidateLanguageRepository = new CandidateLanguageRepository();
