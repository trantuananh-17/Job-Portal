import { Education } from '@prisma/client';
import { IBaseRepository } from '~/global/base/repositories/base.repository';

export interface IEducationRepository extends IBaseRepository<Education> {}
