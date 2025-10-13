export interface ICompanyResponse {
  id: string;
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
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  teamSize: number;
  establishmentDate: string;
  websiteUrl: string;
  mapLink: string;
  address: string;
}
