import { CandidateExperience } from '@prisma/client';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import { ICandidateExperienceRepository } from '../candidate-experience.repository';
import prisma from '~/prisma';
import { ICandidateExperience } from '../../interfaces/candidate-experience.interface';

class CandidateExperienceRepository
  extends BaseRepository<CandidateExperience>
  implements ICandidateExperienceRepository
{
  constructor() {
    super(prisma.candidateExperience);
  }

  async deleteExperience(id: number, candidateProfileId: number): Promise<boolean> {
    const deleted = await prisma.candidateExperience.delete({
      where: { id, candidateProfileId }
    });

    return !!deleted;
  }

  async updateCandidateExperience(
    id: number,
    data: Partial<ICandidateExperience>,
    candidateProfileId: number
  ): Promise<CandidateExperience> {
    return await prisma.candidateExperience.update({
      where: { id, candidateProfileId },
      data: {
        company: data.company,
        department: data.department,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        responsibilities: data.responsibilities
      }
    });
  }

  async getOne(id: number, candidateProfileId: number): Promise<CandidateExperience | null> {
    return await prisma.candidateExperience.findUnique({
      where: { id, candidateProfileId }
    });
  }

  async getMyExperiences(candidateProfileId: number): Promise<CandidateExperience[]> {
    return await prisma.candidateExperience.findMany({
      where: {
        candidateProfileId
      }
    });
  }

  async createCandidateExperience(
    data: ICandidateExperience,
    candidateProfileId: number
  ): Promise<CandidateExperience> {
    return await prisma.candidateExperience.create({
      data: {
        company: data.company,
        department: data.department,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        responsibilities: data.responsibilities,
        candidateProfileId
      }
    });
  }
}

export const candidateExperienceRepository: ICandidateExperienceRepository = new CandidateExperienceRepository();
