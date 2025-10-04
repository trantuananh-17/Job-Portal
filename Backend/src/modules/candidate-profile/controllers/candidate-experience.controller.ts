import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { ICandidateExperienceService } from '../service/candidate-experience.service';
import { candidateExperienceService } from '../service/implements/candidate-experience.service.impl';

class CandidateExperienceController {
  constructor(private readonly candidateExperienceService: ICandidateExperienceService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.readMyExperiences = this.readMyExperiences.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateExperience = await this.candidateExperienceService.create(req.body, userId);

    return res.status(HttpStatus.CREATED).json({
      message: 'Create candidate experience successfully',
      data: candidateExperience
    });
  }

  public async getAll(req: Request, res: Response) {
    const candidateExperiences = await this.candidateExperienceService.getAll();

    return res.status(HttpStatus.OK).json({
      message: 'Get all candidate experiences',
      data: candidateExperiences
    });
  }

  public async readMyExperiences(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateExperiences = await this.candidateExperienceService.getMyExperiences(userId);

    return res.status(HttpStatus.OK).json({
      message: 'Get my candidate experiences',
      data: candidateExperiences
    });
  }

  public async update(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = +req.user.id;
    const candidateExperience = await this.candidateExperienceService.update(id, req.body, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Update candidate experience successfully',
      data: candidateExperience
    });
  }

  public async delete(req: Request, res: Response) {
    const id = +req.params.id;
    const userId = +req.user.id;
    await this.candidateExperienceService.delete(id, userId);

    return res.status(HttpStatus.OK).json({
      message: 'Delete candidate experience successfully'
    });
  }
}

export const candidateExperienceController: CandidateExperienceController = new CandidateExperienceController(
  candidateExperienceService
);
