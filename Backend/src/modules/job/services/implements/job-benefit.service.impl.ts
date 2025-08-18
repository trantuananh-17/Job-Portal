import { IJobBenefitService } from '../job-benefit.service';

class JobBenefitService implements IJobBenefitService {}

export const jobBenefitService: IJobBenefitService = new JobBenefitService();
