import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { packageService } from '../services/implements/package.service.impl';

class PackageController {
  public async create(req: Request, res: Response) {
    const packageEntity = await packageService.create(req.body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create package successfully',
      data: packageEntity
    });
  }

  public async getAll(req: Request, res: Response) {
    const packages = await packageService.readAll({ isActive: true });

    return res.status(HttpStatus.OK).json({
      message: 'Get all packages',
      data: packages
    });
  }

  public async getAllAdmin(req: Request, res: Response) {
    const packages = await packageService.readAll({});

    return res.status(HttpStatus.OK).json({
      message: 'Get all packages',
      data: packages
    });
  }

  public async getOne(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await packageService.readOne(packageId, { isActive: true });

    return res.status(HttpStatus.OK).json({
      message: 'Get one package',
      data: packageEntity
    });
  }

  public async getOneAdmin(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await packageService.readOne(packageId);

    return res.status(HttpStatus.OK).json({
      message: 'Get one package',
      data: packageEntity
    });
  }

  public async update(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await packageService.update(packageId, req.body);

    return res.status(HttpStatus.OK).json({
      message: 'Update package successfully',
      data: packageEntity
    });
  }

  public async updateActive(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await packageService.updateActive(packageId, req.body.isActive);

    return res.status(HttpStatus.OK).json({
      message: 'Update package active successfully',
      data: packageEntity
    });
  }
}

export const packageController: PackageController = new PackageController();
