import { CandidateProfile } from '@prisma/client';
import prisma from '~/prisma';
import { ICandidateProfileRepository } from '../candidate-profile.repository';
import { ICandidateProfile } from '../../interfaces/candidate-profile.interface';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';

class CandidateProfileRepository extends BaseRepository<CandidateProfile> implements ICandidateProfileRepository {
  constructor() {
    super(prisma.candidateProfile);
  }

  async createCandidateProfile(data: ICandidateProfile, userId: number): Promise<CandidateProfile> {
    const parsedDate = new Date(data.dateofbirth);
    return await prisma.candidateProfile.create({
      data: {
        fullname: data.fullname,
        gender: data.gender,
        phone: data.phone,
        cv: data.cv,
        dateofbirth: parsedDate,
        address: data.address,
        userId
      }
    });
  }

  async getExistProfile(userId: number): Promise<CandidateProfile | null> {
    return await prisma.candidateProfile.findUnique({ where: { userId } });
  }

  async updateOpenToWorkStatus(id: number, openToWork: boolean): Promise<CandidateProfile> {
    const status = !openToWork;
    return await prisma.candidateProfile.update({
      where: { id },
      data: { openToWork: status }
    });
  }
}

export const candidateProfileRepository: ICandidateProfileRepository = new CandidateProfileRepository();
