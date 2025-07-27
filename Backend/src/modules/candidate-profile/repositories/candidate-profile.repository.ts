import prisma from '~/prisma';
import { ICreateCandidateProfile } from '../interfaces/candidate-profile.interface';
import { CandidateProfile } from 'generated/prisma';

class CandidateProfileRepository {
  public async createCandidateProfile(data: ICreateCandidateProfile, userId: number) {
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
}

export const candidateProfileRepository: CandidateProfileRepository = new CandidateProfileRepository();
