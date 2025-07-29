import { Level } from './../../../../node_modules/.prisma/client/index.d';
interface ICandidateLanguage {
  languageName: string;
  level?: Level;
}

export { ICandidateLanguage };
