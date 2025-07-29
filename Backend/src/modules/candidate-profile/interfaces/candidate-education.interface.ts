import { Degree } from '@prisma/client';

interface ICandidateEducation {
  educationId: number;
  major: string;
  degree: Degree;
  yearStart: number;
  yearEnd: number;
}

interface IUpdateCandidateEducation {
  educationId: number;
  major: string;
  degree: Degree;
  yearStart: number;
  yearEnd: number;
}

export { ICandidateEducation, IUpdateCandidateEducation };
