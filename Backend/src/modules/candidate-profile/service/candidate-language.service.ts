import { ICandidateLanguage } from '../interfaces/candidate-language.interface';

class CandidateLanguageSerive {
  public async create(requestBody: ICandidateLanguage) {}
}

export const candidateLanguageSerive: CandidateLanguageSerive = new CandidateLanguageSerive();
