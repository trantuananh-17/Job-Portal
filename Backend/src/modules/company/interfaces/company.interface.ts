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

export interface ICompanyresposne {
  id: string;
  name: string;
  logo?: string;
  description: string;
  teamSize: number;
  establishmentDate: string;
  websiteUrl: string;
  mapLink: string;
  address: string;
}
