import { CandidateLanguages } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface ICandidateLanguageRepository extends IBaseRepository<CandidateLanguages> {}
