interface IPackage {
  id: number;
  label: string;
  price: number;
  jobPostLimit: number;
  salePrice: number | null;
  priorityLevel: number;
}

interface IPackageResponseByAdmin extends IPackage {
  isActive: boolean;
  isDelete: boolean;
  isRecommended: boolean;

  _count: {
    orders: number;
  };

  createdAt: Date;
  updatedAt: Date | null;
}

interface recuiterPackageActive {
  id: number;
  recruiterId: number;
  packageId: number;
  startDate: string;
  endDate: string;
  status: string;
}

export { IPackage, recuiterPackageActive, IPackageResponseByAdmin };
