import prisma from '~/prisma';
import { ICandidateProfile } from '../interfaces/candidate-profile.interface';
import { CandidateProfile } from 'generated/prisma';

class CandidateProfileRepository {
  public async createCandidateProfile(data: ICandidateProfile, userId: number) {
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

  public async getAll(): Promise<CandidateProfile[] | []> {
    return await prisma.candidateProfile.findMany();
  }

  public async getById(id: number): Promise<CandidateProfile | null> {
    return await prisma.candidateProfile.findUnique({
      where: { id }
    });
  }

  public async getExistProfile(userId: number) {
    return await prisma.candidateProfile.findUnique({
      where: { userId }
    });
  }

  public async updateCandidateProfile(id: number, data: Partial<ICandidateProfile>) {
    return await prisma.candidateProfile.update({
      where: { id },
      data: data
    });
  }

  public async updateOpenToWorkStatus(id: number, openToWord: boolean) {
    const status = !openToWord;

    return await prisma.candidateProfile.update({
      where: { id },
      data: { openToWork: status }
    });
  }

  public async deleteCandidateProfile(id: number) {
    return await prisma.candidateProfile.delete({ where: { id } });
  }
}

export const candidateProfileRepository: CandidateProfileRepository = new CandidateProfileRepository();
