import { Request, Response } from 'express';
import { companyImageService } from '../services/implements/company-image.service.impl';
import HttpStatus from '~/global/constants/http.constant';

class CompanyImageController {
  public async create(req: Request, res: Response) {
    const companyId = +req.params.companyId;
    const userId = +req.user.id;

    await companyImageService.addImages(companyId, userId, req.files as Express.Multer.File[]);

    res.status(HttpStatus.CREATED).json({
      message: 'Add image to company successfully'
    });
  }

  public async getAll(req: Request, res: Response) {
    const companyId = +req.params.companyId;

    const companyImages = await companyImageService.getAll(companyId);

    res.status(HttpStatus.OK).json({
      message: 'Get all company images',
      data: companyImages
    });
  }

  public async delete(req: Request, res: Response) {
    const companyId = +req.params.companyId;
    const userId = +req.user.id;
    const companyImageId = +req.params.companyImageId;

    await companyImageService.delete(companyId, userId, companyImageId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete company image successfully'
    });
  }
}

export const companyImageController: CompanyImageController = new CompanyImageController();
