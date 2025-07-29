import { Education } from '@prisma/client';
import { NotFoundException } from '~/global/core/error.core';
import { educationRepository } from '../../repositories/implements/education.repository.impl';
import { IEducationService } from '../education.service';

class EducationService implements IEducationService {
  public async findEducation(educationId: number): Promise<Education> {
    const education = await educationRepository.findById(educationId);

    if (!education) {
      throw new NotFoundException('Không tìm thấy trường học này');
    }

    return education;
  }
}

export const educationService: IEducationService = new EducationService();
