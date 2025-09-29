import { CandidateProfile } from '@prisma/client';
import { BadRequestException, NotFoundException } from '~/global/core/error.core';
import { ICandidateProfile } from '../../interfaces/candidate-profile.interface';
import { candidateProfileRepository } from '../../repositories/implements/candidate-profile.repository.impl';
import { ICandidateProfileService } from '../candidate-profile.service';
import { ICandidateProfileRepository } from '../../repositories/candidate-profile.repository';

class CandidateProfileService implements ICandidateProfileService {
  constructor(private readonly candidateProfileRepository: ICandidateProfileRepository) {}

  public async getOneByUserId(userId: number): Promise<CandidateProfile> {
    const candidateProfile: CandidateProfile | null = await this.candidateProfileRepository.getExistProfile(userId);

    if (!candidateProfile) {
      throw new NotFoundException('Không tìm thấy hồ sơ ứng viên');
    }

    return candidateProfile;
  }

  public async create(requestBody: ICandidateProfile, userId: number): Promise<CandidateProfile> {
    const existingProfile = await this.candidateProfileRepository.getExistProfile(userId);

    if (existingProfile) {
      throw new BadRequestException('Hồ sơ đã tồn tại, không thể tạo mới');
    }

    const candidateProfile = await this.candidateProfileRepository.createCandidateProfile(requestBody, userId);

    return candidateProfile;
  }

  public async getAll(): Promise<CandidateProfile[] | []> {
    const candidateProfiles: CandidateProfile[] = await this.candidateProfileRepository.findAll();

    return candidateProfiles;
  }

  public async getOne(id: number): Promise<CandidateProfile> {
    const candidateProfile: CandidateProfile | null = await this.candidateProfileRepository.findById(id);

    if (!candidateProfile) {
      throw new NotFoundException('Không tìm thấy thông tin hồ sơ ứng viên');
    }

    return candidateProfile;
  }

  public async update(id: number, requestBody: Partial<ICandidateProfile>): Promise<CandidateProfile> {
    await this.getOne(id);

    // Lọc trường nào thiếu
    const data = Object.fromEntries(
      Object.entries({
        ...requestBody,
        dateofbirth: requestBody.dateofbirth ? new Date(requestBody.dateofbirth) : undefined
      }).filter(([_, v]) => v !== undefined)
    );

    const profileUpdated: CandidateProfile = await this.candidateProfileRepository.update(id, data);

    return profileUpdated;
  }

  public async changeOpenToWorkStatus(id: number): Promise<void> {
    const profile = await this.getOne(id);

    await this.candidateProfileRepository.updateOpenToWorkStatus(id, profile.openToWork);
  }

  public async delete(id: number): Promise<void> {
    await this.getOne(id);

    await this.candidateProfileRepository.delete(id);
  }
}

export const candidateProfileService: ICandidateProfileService = new CandidateProfileService(
  candidateProfileRepository
);
