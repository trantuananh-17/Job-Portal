export interface IPackage {
  id: number;
  label: string;
  price: number;
  jobPostLimit: number;
  salePrice: number | null;
  priorityLevel: number;
}

export interface IPackageResponseByAdmin extends IPackage {
  isActive: boolean;
  isDelete: boolean;
  isRecommended: boolean;

  _count: {
    orders: number;
  };

  createdAt: Date;
  updatedAt: Date | null;
}

export interface ICreateAndUpdatePackage {
  label: string;
  price: number;
  jobPostLimit: number;
  isActive: boolean;
}
