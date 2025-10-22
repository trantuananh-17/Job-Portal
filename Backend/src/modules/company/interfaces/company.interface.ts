import { Company, CompanyStatus } from '@prisma/client';

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

export interface ICompanyInfoResponse {
  id: number;
  name: string;
  status?: CompanyStatus;
  createdAt: Date;
  updatedAt: Date | null;
  isApproved?: boolean;
  user: {
    id: number;
    email: string;
    name: string | null;
  };
}

export interface ICompanyApporvedMessage {
  receiverEmail?: string;
  username?: string;
  companyName?: string;
  planName?: string;
  createdAt?: string;
  sender?: string;
  actionLink?: string;
  actionText?: string;
  message?: string;
  subject?: string;
  header?: string;
}
