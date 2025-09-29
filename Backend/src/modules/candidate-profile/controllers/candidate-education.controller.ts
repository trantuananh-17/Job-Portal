import { Request, Response } from 'express';
import { ICandidateEducationService } from '../service/candidate-education.service';
import { candidateEducationService } from '../service/implements/candidate-education.service.impl';
import HttpStatus from '~/global/constants/http.constant';

class CandidateEducationController {
  constructor(private readonly candidateEducationService: ICandidateEducationService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getMyEducation = this.getMyEducation.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;

    const candidateEducation = await this.candidateEducationService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Thêm mới trình độ học vấn thành công',
      data: candidateEducation
    });
  }

  public async getAll(req: Request, res: Response) {
    const candidateEducations = await this.candidateEducationService.getAll();

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách học vấn ứng viên thành công',
      data: candidateEducations
    });
  }

  public async getMyEducation(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateEducations = await this.candidateEducationService.getMyEducations(userId);

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách học vấn thành công',
      data: candidateEducations
    });
  }

  public async update(req: Request, res: Response) {
    const userId = +req.user.id;
    const educationId = +req.params.educationId;

    const candidateEducation = await this.candidateEducationService.update(educationId, req.body, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Cập nhật học vấn thành công',
      data: candidateEducation
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const educationId = +req.params.educationId;

    await this.candidateEducationService.delete(educationId, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Xóa thông tin học vấn thành công'
    });
  }
}

export const candidateEducationController: CandidateEducationController = new CandidateEducationController(
  candidateEducationService
);
