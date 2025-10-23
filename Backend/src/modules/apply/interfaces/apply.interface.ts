import { ApplyStatus } from '@prisma/client';
import { Express } from 'express';

interface IApply {
  candidateProfileId: number;
  jobId: number;
  status: ApplyStatus;
}

interface IApplyMessage {
  candidateProfileId: number;
  jobId: number;
  cv: {
    originalname: string;
    mimeType: string;
    file: string;
  };
}

export { IApply, IApplyMessage };
