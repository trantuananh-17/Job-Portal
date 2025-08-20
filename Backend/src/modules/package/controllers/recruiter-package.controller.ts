import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { recruiterPackageService } from '../services/implements/recruiter-package.service.impl';

class RecruiterPackageController {
  public async create(req: Request, res: Response) {
    const { packageId } = req.body;
    const userId = +req.user.id;

    const recruiterPackage = await recruiterPackageService.create(packageId, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create recruiter package successfully',
      data: recruiterPackage
    });
  }
}

export const recruiterPackageController: RecruiterPackageController = new RecruiterPackageController();
