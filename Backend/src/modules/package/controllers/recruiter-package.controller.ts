import { IRecruiterPackageService } from './../services/recruiter-package.service';
import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { recruiterPackageService } from '../services/implements/recruiter-package.service.impl';

class RecruiterPackageController {
  constructor(private readonly recruiterPackageService: IRecruiterPackageService) {
    this.create = this.create.bind(this);
  }

  public async create(req: Request, res: Response) {
    const { packageId } = req.body;
    const userId = +req.user.id;

    const recruiterPackage = await this.recruiterPackageService.create(packageId, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create recruiter package successfully',
      data: recruiterPackage
    });
  }
}

export const recruiterPackageController: RecruiterPackageController = new RecruiterPackageController(
  recruiterPackageService
);
