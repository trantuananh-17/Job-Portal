import { CandidateEducation, PrismaClient } from '@prisma/client';
import { ICandidateEducationRepository } from '../candidate-education.repository';
import { BaseRepository } from '~/global/base/repositories/implements/base.repository.impl';
import prisma from '~/prisma';
import { IUpdateCandidateEducation } from '../../interfaces/candidate-education.interface';

class CandidateEducationRepository extends BaseRepository<CandidateEducation> implements ICandidateEducationRepository {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma.candidateEducation);
  }

  async findByProfileId(profileId: number): Promise<CandidateEducation[]> {
    return await this.prisma.candidateEducation.findMany({
      where: { candidateProfileId: profileId }
    });
  }

  async updateCandidateEducation(
    candidateProfileId: number,
    educationId: number,
    data: Partial<IUpdateCandidateEducation>
  ): Promise<CandidateEducation> {
    return await this.prisma.candidateEducation.update({
      where: {
        candidateProfileId_educationId: {
          candidateProfileId,
          educationId
        }
      },
      data
    });
  }

  async deleteCandidateEducation(educationId: number, candidateProfileId: number): Promise<boolean> {
    const deleted = await this.prisma.candidateEducation.delete({
      where: {
        candidateProfileId_educationId: {
          candidateProfileId,
          educationId
        }
      }
    });

    return !!deleted;
  }
}

export const candidateEducationRepository: ICandidateEducationRepository = new CandidateEducationRepository(prisma);
