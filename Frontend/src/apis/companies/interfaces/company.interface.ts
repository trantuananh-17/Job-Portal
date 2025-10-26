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
  status?: string;
  createdAt: Date;
  updatedAt: Date | null;
  isApproved?: boolean;
  user: {
    id: number;
    email: string;
    name: string | null;
  };
}
