import { Gender } from '@prisma/client';

interface ICandidateProfile {
  fullname: string;
  gender: Gender;
  phone: string;
  cv: string;
  dateofbirth: string;
  address: string;
}

export { ICandidateProfile };
