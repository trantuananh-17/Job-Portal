import { Request, Response } from 'express';
import { candidateLanguageSerive } from '../service/candidate-language.service';
import HttpStatus from '~/global/constants/http.constant';

class CandidateLanguagesController {
  public async create(req: Request, res: Response) {
    const userId = +req.user.id;
    const candidateLanguage = await candidateLanguageSerive.create(userId, req.body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Tạo mới thông tin ngôn ngữ của ứng viên thành công',
      data: candidateLanguage
    });
  }
}

export const candidateLanguagesController: CandidateLanguagesController = new CandidateLanguagesController();
