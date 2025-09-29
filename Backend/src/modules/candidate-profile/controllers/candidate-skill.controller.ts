import { Request, Response } from 'express';
import { candidateSkillService } from '../service/implements/candidate-skill.service.impl';
import HttpStatus from '~/global/constants/http.constant';
import { ICandidateSkillService } from '../service/candidate-skill.service';

class CandidateSkillController {
  constructor(private readonly candidateSkillService: ICandidateSkillService) {
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.readAll = this.readAll.bind(this);
    this.getMySkills = this.getMySkills.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateSkill = await this.candidateSkillService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Thêm mới kỹ năng ứng viên thành công',
      data: candidateSkill
    });
  }

  public async readAll(req: Request, res: Response) {
    const candidateSkills = await this.candidateSkillService.findAll();

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách tất cả kĩ năng ứng viên thành công',
      data: candidateSkills
    });
  }

  public async getMySkills(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateSkills = await this.candidateSkillService.findMySkills(userId);

    return res.status(HttpStatus.OK).json({
      message: 'Lấy danh sách kĩ năng thành công',
      data: candidateSkills
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const skillName = req.params.skillName;

    await this.candidateSkillService.delete(skillName, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Xóa kĩ năng ứng viên thành công'
    });
  }
}

export const candidateSkillController: CandidateSkillController = new CandidateSkillController(candidateSkillService);
