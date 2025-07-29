import { CandidateEducation, Education } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { IEducationRepository } from '../education.repository';

class EducationRepository extends BaseRepository<Education> implements IEducationRepository {
  constructor() {
    super(prisma.education);
  }
}

export const educationRepository: IEducationRepository = new EducationRepository();
