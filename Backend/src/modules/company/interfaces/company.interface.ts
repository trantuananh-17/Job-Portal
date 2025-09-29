import { Company } from '@prisma/client';

export interface ICompany {
  name: string;
  description: string;
  teamSize: number;
  establishmentDate: string;
  websiteUrl: string;
  mapLink: string;
  address: string;
}
