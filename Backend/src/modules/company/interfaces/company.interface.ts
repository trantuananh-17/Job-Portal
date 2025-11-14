import { Company, CompanyStatus } from '@prisma/client';

export interface ICompany {
  name: string;
  emailCompany: string;
  phoneCompany: string;
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
  emailCompany: string;
  phoneCompany: string;
  status?: CompanyStatus;
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted?: boolean;
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

export interface ICompanyResponse {
  id: number;
  name: string;
  emailCompany: string;
  phoneCompany: string;
  description: string;
  teamSize: number;
  establishmentDate: Date;
  views: number;
  websiteUrl: string | null;
  status: string;
  isDeleted: boolean;
  mapLink: string | null;
  address: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface ICompanyByAdminResponse extends ICompanyResponse {
  user: {
    id: number;
    name: string | null;
    email: string;
    avatarUrl: string | null;
    avatarKey: string | null;
  };
}

export interface IMyCompany extends ICompanyResponse {}
