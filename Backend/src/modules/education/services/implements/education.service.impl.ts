import { Education } from '@prisma/client';
import { NotFoundException } from '~/global/core/error.core';
import { IEducationService } from '../education.service';
import { IEducationRepository } from '../../repositories/education.repository';
import { educationRepository } from '../../repositories/implements/education.repository.impl';

class EducationService implements IEducationService {
  constructor(private readonly educationRepository: IEducationRepository) {}

  public async findEducation(educationId: number): Promise<Education> {
    const education = await this.educationRepository.findById(educationId);

    if (!education) {
      throw new NotFoundException('Không tìm thấy trường học này');
    }

    return education;
  }
}

export const educationService: IEducationService = new EducationService(educationRepository);
