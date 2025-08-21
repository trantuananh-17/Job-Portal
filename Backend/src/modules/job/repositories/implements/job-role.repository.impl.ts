import { JobRole } from '@prisma/client';
import { IJobRoleRepository } from '../job-role.repository';
import prisma from '~/prisma';

class JobRoleRepository implements IJobRoleRepository {
  async findOne(name: string): Promise<JobRole | null> {
    return await prisma.jobRole.findUnique({
      where: { name }
    });
  }

  async create(name: string): Promise<JobRole> {
    return await prisma.jobRole.create({
      data: { name }
    });
  }

  async delete(name: string): Promise<boolean> {
    const deleted = await prisma.jobRole.delete({
      where: { name }
    });

    return !!deleted;
  }
}

export const jobRoleRepository: IJobRoleRepository = new JobRoleRepository();
