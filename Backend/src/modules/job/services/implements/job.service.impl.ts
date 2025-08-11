import { IJobService } from '../job.service';

class JobService implements IJobService {}

export const jobService: IJobService = new JobService();
