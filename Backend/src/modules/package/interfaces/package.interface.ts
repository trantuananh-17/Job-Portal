interface IPackage {
  label: string;
  price: number;
  jobPostLimit: number;
}

interface recuiterPackageActive {
  id: number;
  recruiterId: number;
  packageId: number;
  startDate: string;
  endDate: string;
  status: string;
}

export { IPackage, recuiterPackageActive };
