import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { packageService } from '../services/implements/package.service.impl';
import { IPackageService } from '../services/package.service';

class PackageController {
  constructor(private readonly packageService: IPackageService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getAllAdmin = this.getAllAdmin.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getOneAdmin = this.getOneAdmin.bind(this);
    this.update = this.update.bind(this);
    this.updateActive = this.updateActive.bind(this);
  }

  public async create(req: Request, res: Response) {
    const packageEntity = await this.packageService.create(req.body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create package successfully',
      data: packageEntity
    });
  }

  public async getAll(req: Request, res: Response) {
    const packages = await this.packageService.readAll({ isActive: true });

    return res.status(HttpStatus.OK).json({
      message: 'Get all packages',
      data: packages
    });
  }

  public async getAllAdmin(req: Request, res: Response) {
    const packages = await this.packageService.readAll({});

    return res.status(HttpStatus.OK).json({
      message: 'Get all packages',
      data: packages
    });
  }

  public async getOne(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await this.packageService.readOne(packageId, { isActive: true });

    return res.status(HttpStatus.OK).json({
      message: 'Get one package',
      data: packageEntity
    });
  }

  public async getOneAdmin(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await this.packageService.readOne(packageId);

    return res.status(HttpStatus.OK).json({
      message: 'Get one package',
      data: packageEntity
    });
  }

  public async update(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await this.packageService.update(packageId, req.body);

    return res.status(HttpStatus.OK).json({
      message: 'Update package successfully',
      data: packageEntity
    });
  }

  public async updateActive(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await this.packageService.updateActive(packageId, req.body.isActive);

    return res.status(HttpStatus.OK).json({
      message: 'Update package active successfully',
      data: packageEntity
    });
  }
}

export const packageController: PackageController = new PackageController(packageService);
