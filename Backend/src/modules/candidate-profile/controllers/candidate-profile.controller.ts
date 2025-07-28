import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { candidateProfileService } from '../service/candidate-profile.service';

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

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách hồ sơ ứng viên thành công',
      data: candidateProfiles
    });
  }

  public async getOne(req: Request, res: Response) {
    const id = +req.params.id;

    const candidateProfile = await candidateProfileService.getOne(id);

    return res.status(HttpStatus.OK).json({
      message: 'Lấy hồ sơ ứng viên thành công',
      data: candidateProfile
    });
  }

  public async update(req: Request, res: Response) {
    const id = +req.params.id;

    const userId = +req.user.id;

    const updatedCandidateProfile = await candidateProfileService.update(id, req.body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Cập nhật hồ sơ ứng viên thành công',
      data: updatedCandidateProfile
    });
  }

  public async changeOpenToWordStatus(req: Request, res: Response) {
    const id = +req.params.id;

    await candidateProfileService.changeOpenToWorkStatus(id);

    return res.status(HttpStatus.CREATED).json({
      message: 'Cập nhập trạng thái tìm việc thành công'
    });
  }

  public async delete(req: Request, res: Response) {
    const id = +req.params.id;

    const userId = +req.user.id;

    await candidateProfileService.delete(id);

    return res.status(HttpStatus.CREATED).json({
      message: 'Xoá hồ sơ ứng viên thành công'
    });
  }
}

export const candidateProfileController: CandidateProfileController = new CandidateProfileController();
