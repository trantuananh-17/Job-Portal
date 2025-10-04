import { candidateLanguageSerive } from './../service/implements/candidate-language.service.impl';
import { Request, Response } from 'express';
import HttpStatus from '~/global/constants/http.constant';
import { ICandidateLanguagesService } from '../service/candidate-language.service';

class CandidateLanguagesController {
  constructor(private readonly candidateLanguageSerive: ICandidateLanguagesService) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getMyLanguages = this.getMyLanguages.bind(this);
    this.updateLevel = this.updateLevel.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateLanguage = await this.candidateLanguageSerive.create(userId, req.body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Tạo mới thông tin ngôn ngữ của ứng viên thành công',
      data: candidateLanguage
    });
  }

  public async getAll(req: Request, res: Response) {
    const candidateLanguages = await this.candidateLanguageSerive.getAll();

    return res.status(HttpStatus.OK).json({
      message: 'Lấy thông tin ngôn ngữ của tất cả ứng viên thành công',
      data: candidateLanguages
    });
  }

  public async getMyLanguages(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateLanguages = await this.candidateLanguageSerive.getMyLanguage(userId);

    return res.status(HttpStatus.OK).json({
      message: 'Lấy thông tin ngôn ngữ thành công',
      data: candidateLanguages
    });
  }

  public async updateLevel(req: Request, res: Response) {
    const userId = +req.user.id;
    const languageName = req.params.languageName;
    const { level } = req.body;
    const candidateLanguages = await this.candidateLanguageSerive.updateLevel(userId, languageName, level);

    return res.status(HttpStatus.OK).json({
      message: 'Cập nhật thông tin ngôn ngữ thành công',
      data: candidateLanguages
    });
  }

  public async delete(req: Request, res: Response) {
    const userId = +req.user.id;
    const languageName = req.params.languageName;

    await this.candidateLanguageSerive.deleteLanguage(userId, languageName);

    return res.status(HttpStatus.OK).json({
      message: 'Xóa thông tin ngôn ngữ thành công'
    });
  }
}

export const candidateLanguagesController: CandidateLanguagesController = new CandidateLanguagesController(
  candidateLanguageSerive
);
