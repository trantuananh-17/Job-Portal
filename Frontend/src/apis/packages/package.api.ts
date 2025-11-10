import type { ICreateAndUpdatePackage } from './interfaces/package.interface';

export const createPackageApi = async (data: ICreateAndUpdatePackage) => {
  const response = 'Create successfully';

  return response;
};

export const updatePackageApi = async (data: ICreateAndUpdatePackage, id: number) => {
  const response = 'Update successfully';

  return response;
};
