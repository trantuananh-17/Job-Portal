import { applyRepository } from './../../repositories/implements/apply.repository.impl';
import { Apply } from '@prisma/client';
import { IPaginatedResult } from '~/global/base/interfaces/base.interface';
import { IApply, IApplyMessage } from '../../interfaces/apply.interface';
import { IApplyService } from '../apply.service';
import { candidateProfileService } from '~/modules/candidate-profile/service/implements/candidate-profile.service.impl';
import { jobService } from '~/modules/job/services/implements/job.service.impl';
import { BadRequestException } from '~/global/core/error.core';
import { getPaginationAndFilters } from '~/global/helpers/pagination-filter.helper';
import { serializeData } from '~/global/helpers/serialize.helper';
import { IApplyRepository } from '../../repositories/apply.repository';
import { IJobService } from '~/modules/job/services/job.service';
import { ICandidateProfileService } from '~/modules/candidate-profile/service/candidate-profile.service';
import { publishDirectMessage } from '~/queues/producer';
import { channel } from '~/server';

class ApplyService implements IApplyService {
  constructor(
    private readonly applyRepository: IApplyRepository,
    private readonly jobService: IJobService,
    private readonly candidateProfileService: ICandidateProfileService
  ) {}

  async create(jobId: number, userId: number, cv: Express.Multer.File): Promise<Apply> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);
    await this.jobService.findOneActive(jobId);
    const existApply = await this.getOne(candidateProfile.id, jobId);

    if (existApply) {
      throw new BadRequestException(`You cannot apply the same job`);
    }

    const apply = await this.applyRepository.createApply(candidateProfile.id, jobId);

    if (apply) {
      const messageDetails: IApplyMessage = {
        candidateProfileId: candidateProfile.id,
        jobId,
        cv: {
          originalname: cv.originalname,
          mimeType: cv.mimetype,
          file: cv.buffer.toString('base64')
        }
      };

      await publishDirectMessage(
        channel,
        'apply-job',
        'upload-cv',
        JSON.stringify(messageDetails),
        'Apply job for candidate.'
      );
    }

    return apply;
  }

  async getByMe({ page, limit }: any, userId: number): Promise<IPaginatedResult<Apply>> {
    const candidateProfile = await this.candidateProfileService.getOneByUserId(userId);

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter: '',
      filterFields: [],
      entity: 'apply',
      additionalCondition: { candidateProfileId: candidateProfile.id }
    });

    return { data, totalCounts };
  }

  async getByRecruiter({ page, limit }: any, jobId: number, userId: number): Promise<IPaginatedResult<Apply>> {
    const job = await this.jobService.findJobByUser(jobId, userId);

    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter: '',
      filterFields: [],
      entity: 'apply',
      additionalCondition: { jobId: job.id },
      orderCondition: {},
      include: { candidateProfile: true }
    });

    const dataConfig = {
      candidateProfile: [
        { newKey: 'candidateName', property: 'fullName' },
        { newKey: 'candidatePhone', property: 'phone' },
        { newKey: 'candidateCv', property: 'cv' }
      ]
    };

    const results = data.map((apply: Apply) => serializeData(apply, dataConfig));

    return { data: results, totalCounts };
  }

  async updateStatus(requestBody: IApply, userId: number): Promise<Apply> {
    const { candidateProfileId, jobId, status } = requestBody;

    await this.jobService.findJobByUser(jobId, userId);
    const existApply = await this.getOne(candidateProfileId, jobId);

    if (!existApply) {
      throw new BadRequestException(`Cannot find application`);
    }

    const apply = this.applyRepository.updateStatusApply(candidateProfileId, jobId, status);

    return apply;
  }

  async getOne(candidateProfileId: number, jobId: number): Promise<Apply | null> {
    const apply = await this.applyRepository.getOne(candidateProfileId, jobId);

    return apply;
  }
}

export const applyService: IApplyService = new ApplyService(applyRepository, jobService, candidateProfileService);
