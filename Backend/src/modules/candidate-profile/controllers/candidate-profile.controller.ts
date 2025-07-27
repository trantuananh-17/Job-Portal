import { Request, Response } from 'express';
import { candidateProfileService } from '../service/candidate-profile.service';
import HttpStatus from '~/global/constants/http.constant';

class CandidateProfileController {
  public async create(req: Request, res: Response) {
    const userId = +req.user.id;

    const candidateProfile = await candidateProfileService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Tạo hồ sơ ứng viên thành công',
      data: candidateProfile
    });
  }

  public async getAll(req: Request, res: Response) {
    const candidateProfiles = await candidateProfileService.getAll();

    return res.status(HttpStatus.CREATED).json({
      message: 'Lấy danh sách hồ sơ ứng viên thành công',
      data: candidateProfiles
    });
  }

  public async getOne(req: Request, res: Response) {
    const id = +req.params.id;

    const candidateProfile = await candidateProfileService.getOne(id);

    return res.status(HttpStatus.CREATED).json({
      message: 'Lấy hồ sơ ứng viên thành công',
      data: candidateProfile
    });
  }
}

export const candidateProfileController: CandidateProfileController = new CandidateProfileController();
