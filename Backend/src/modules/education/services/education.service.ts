import { Education } from '@prisma/client';

export interface IEducationService {
  findEducation(educationId: number): Promise<Education>;
}
