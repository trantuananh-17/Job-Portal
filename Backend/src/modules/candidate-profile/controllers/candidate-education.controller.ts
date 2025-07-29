import { Request, Response } from 'express';
import { ICandidateEducation } from '../interfaces/candidate-education.interface';
import { candidateEducationService } from '../service/implements/candidate-education.service.impl';
import HttpStatus from '~/global/constants/http.constant';

class CandidateEducationController {
  public async create(req: Request, res: Response) {
    const userId = +req.user.id;

    const candidateEducation = await candidateEducationService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Thêm mới trình độ học vấn thành công',
      data: candidateEducation
    });
  }

  public async getAll(req: Request, res: Response) {
    const candidateEducations = await candidateEducationService.getAll();

    return res.status(HttpStatus.CREATED).json({
      message: 'Lấy danh sách học vấn ứng viên thành công',
      data: candidateEducations
    });
  }

  public async getMyEducation(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateEducations = await candidateEducationService.getMyEducations(userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Lấy danh sách học vấn thành công',
      data: candidateEducations
    });
  }

  public async update(req: Request, res: Response) {
    const userId = +req.user.id;
    const educationId = +req.params.educationId;

    const candidateEducation = await candidateEducationService.update(educationId, req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Cập nhất học vấn thành công',
      data: candidateEducation
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const educationId = +req.params.educationId;

    await candidateEducationService.delete(educationId, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Xóa thông tin học vấn thành công'
    });
  }
}

export const candidateEducationController: CandidateEducationController = new CandidateEducationController();
