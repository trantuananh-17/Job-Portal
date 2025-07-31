import { Request, Response } from 'express';
import { candidateSkillService } from '../service/implements/candidate-skill.service.impl';
import HttpStatus from '~/global/constants/http.constant';

class CandidateSkillController {
  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateSkill = await candidateSkillService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Thêm mới kỹ năng ứng viên thành công',
      data: candidateSkill
    });
  }

  public async readAll(req: Request, res: Response) {
    const candidateSkills = await candidateSkillService.findAll();

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách tất cả kĩ năng ứng viên thành công',
      data: candidateSkills
    });
  }

  public async getMySkills(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateSkills = await candidateSkillService.findMySkills(userId);

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách kĩ năng thành công',
      data: candidateSkills
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const skillName = req.params.skillName;

    await candidateSkillService.delete(skillName, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Xóa kĩ năng ứng viên thành công'
    });
  }
}

export const candidateSkillController: CandidateSkillController = new CandidateSkillController();
