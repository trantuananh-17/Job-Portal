export interface ICompanyResponse {
  id: number;
  name: string;
  avatarUrl?: string;
  description: string;
  teamSize: number;
  establishmentDate: string;
  websiteUrl: string;
  mapLink: string;
  address: string;
  views?: number;
  userId?: number;
}

export interface IUpdateCompanyPayload {
  name?: string;
  description?: string;
  teamSize?: number;
  establishmentDate?: string;
  websiteUrl?: string;
  mapLink?: string;
  address?: string;
}

export interface INewCompanyData {
  id: number;
  name: string;
  avatarUrl: string;
  description: string;
  teamSize: number;
  establishmentDate: string;
  websiteUrl: string;
  mapLink: string;
  address: string;
}

export interface ICompanyByAdminResponse {
  id: number;
  name: string;
  description: string;
  address: string;
  establishmentDate: string;
  avatarUrl: string;
  emailCompany: string;
  phoneCompany: string;
  status: string;
  isDeleted: boolean;
  mapLink: string;
  createdAt: Date;
  updatedAt: Date;
  teamSize: string;
  user: {
    id: number;
    avatarKey: string;
    avatarUrl: string;
    email: string;
    name: string | null;
  };
}
