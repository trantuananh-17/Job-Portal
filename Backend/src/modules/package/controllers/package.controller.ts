import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { packageService } from '../services/implements/package.service.impl';
import { IPackageService } from '../services/package.service';

class PackageController {
  constructor(private readonly packageService: IPackageService) {
    this.create = this.create.bind(this);
    this.getAllByAdmin = this.getAllByAdmin.bind(this);
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

  public async getAllByAdmin(req: Request, res: Response) {
    const { page = 1, limit = 5 } = req.query;
    const data = await this.packageService.getAllByAdmin(Number(page), Number(limit));

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách gói dịch vụ thành công.',
      pagination: {
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        currentPage: data.page,
        limit: data.limit
      },
      data: data.data
    });
  }

  public async getOne(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await this.packageService.getOne(packageId, { isActive: true });

    return res.status(HttpStatus.OK).json({
      message: 'Lấy gói dịch vụ thành công',
      data: packageEntity
    });
  }

  public async getOneAdmin(req: Request, res: Response) {
    const packageId = +req.params.id;

    const packageEntity = await this.packageService.getOne(packageId);

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
