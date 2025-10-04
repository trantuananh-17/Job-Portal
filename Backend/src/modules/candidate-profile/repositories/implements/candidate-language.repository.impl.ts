import { PrismaClient, Level, CandidateLanguages } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { ICandidateLanguageRepository } from '../candidate-language.repository';

class CandidateLanguageRepository extends BaseRepository<CandidateLanguages> implements ICandidateLanguageRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.candidateLanguages);
  }

  async deleteLanguage(candidateProfileId: number, languageName: string): Promise<boolean> {
    const deleted = await this.prisma.candidateLanguages.delete({
      where: { candidateProfileId_languageName: { candidateProfileId, languageName } }
    });

    return !!deleted;
  }

  async updateLevel(candidateProfileId: number, languageName: string, level: Level): Promise<CandidateLanguages> {
    return await this.prisma.candidateLanguages.update({
      where: { candidateProfileId_languageName: { candidateProfileId, languageName } },
      data: { level }
    });
  }

  async getAllMyLanguages(profileId: number): Promise<CandidateLanguages[]> {
    return await this.prisma.candidateLanguages.findMany({
      where: { candidateProfileId: profileId }
    });
  }
}

export const candidateLanguageRepository: ICandidateLanguageRepository = new CandidateLanguageRepository(prisma);
