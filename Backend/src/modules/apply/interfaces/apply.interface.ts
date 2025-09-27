import { ApplyStatus } from '@prisma/client';

interface IApply {
  candidateProfileId: number;
  jobId: number;
  status: ApplyStatus;
}

export { IApply };
