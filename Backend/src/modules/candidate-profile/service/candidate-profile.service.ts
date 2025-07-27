import { CandidateProfile } from 'generated/prisma';
import { ICreateCandidateProfile } from '../interfaces/candidate-profile.interface';
import { candidateProfileRepository } from '../repositories/candidate-profile.repository';
import { NotFoundException } from '~/global/core/error.core';

class CandidateProfileService {
  public async create(requestBody: ICreateCandidateProfile, userId: number) {
    const candidateProfile = await candidateProfileRepository.createCandidateProfile(requestBody, userId);

    return candidateProfile;
  }

  public async getAll(): Promise<CandidateProfile[] | []> {
    const candidateProfiles: CandidateProfile[] = await candidateProfileRepository.getAll();

    return candidateProfiles;
  }

  public async getOne(id: number): Promise<CandidateProfile> {
    const candidateProfile: CandidateProfile | null = await candidateProfileRepository.getById(id);

    if (!candidateProfile) {
      throw new NotFoundException('Không tìm thấy thông tin hồ sơ ứng viên');
    }

    return candidateProfile;
  }
}

export const candidateProfileService: CandidateProfileService = new CandidateProfileService();
