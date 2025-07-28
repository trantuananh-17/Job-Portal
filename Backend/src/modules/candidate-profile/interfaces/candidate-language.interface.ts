import { Level } from './../../../../node_modules/.prisma/client/index.d';
interface ICandidateLanguage {
  candidateProfileId: number;
  languageId: string;
  level: Level;
}

export { ICandidateLanguage };
