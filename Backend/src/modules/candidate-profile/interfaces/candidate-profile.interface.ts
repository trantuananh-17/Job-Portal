import { Gender } from 'generated/prisma';

interface ICreateCandidateProfile {
  fullname: string;
  gender: Gender;
  phone: string;
  cv: string;
  dateofbirth: string;
  address: string;
}

export { ICreateCandidateProfile };
