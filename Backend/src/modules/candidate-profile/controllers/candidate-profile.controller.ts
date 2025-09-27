import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { candidateProfileService } from '../service/implements/candidate-profile.service.impl';
import { ICandidateProfileService } from '../service/candidate-profile.service';

class CandidateProfileController {
  constructor(private readonly candidateProfileService: ICandidateProfileService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.changeOpenToWorkStatus = this.changeOpenToWorkStatus.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;

    const candidateProfile = await this.candidateProfileService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Tạo hồ sơ ứng viên thành công',
      data: candidateProfile
    });
  }

  public async getAll(req: Request, res: Response) {
    const candidateProfiles = await this.candidateProfileService.getAll();

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách hồ sơ ứng viên thành công',
      data: candidateProfiles
    });
  }

  public async getOne(req: Request, res: Response) {
    const id = +req.params.id;

    const candidateProfile = await this.candidateProfileService.getOne(id);

    return res.status(HttpStatus.OK).json({
      message: 'Lấy hồ sơ ứng viên thành công',
      data: candidateProfile
    });
  }

  public async update(req: Request, res: Response) {
    const id = +req.params.id;

    const userId = +req.user.id;

    const updatedCandidateProfile = await this.candidateProfileService.update(id, req.body);

    return res.status(HttpStatus.OK).json({
      message: 'Cập nhật hồ sơ ứng viên thành công',
      data: updatedCandidateProfile
    });
  }

  public async changeOpenToWorkStatus(req: Request, res: Response) {
    const id = +req.params.id;

    await this.candidateProfileService.changeOpenToWorkStatus(id);

    return res.status(HttpStatus.OK).json({
      message: 'Cập nhập trạng thái tìm việc thành công'
    });
  }

  public async delete(req: Request, res: Response) {
    const id = +req.params.id;

    const userId = +req.user.id;

    await this.candidateProfileService.delete(id);

    return res.status(HttpStatus.OK).json({
      message: 'Xoá hồ sơ ứng viên thành công'
    });
  }
}

export const candidateProfileController: CandidateProfileController = new CandidateProfileController(
  candidateProfileService
);
