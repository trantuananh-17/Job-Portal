export interface IPackage {
  id: number;
  label: string;
  price: number;
  jobPostLimit: number;
  isActive: boolean;
  createdAt: string;
}

export interface ICreateAndUpdatePackage {
  label: string;
  price: number;
  jobPostLimit: number;
  isActive: boolean;
}
