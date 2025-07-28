import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { ICandidateLanguageRepository } from '../candidate-language.repository';
import { CandidateLanguages } from './../../../../../node_modules/.prisma/client/index.d';

class CandidateLanguageRepository extends BaseRepository<CandidateLanguages> implements ICandidateLanguageRepository {
  constructor() {
    super(prisma.candidateLanguages);
  }
}

export const candidateLanguageRepository: ICandidateLanguageRepository = new CandidateLanguageRepository();
