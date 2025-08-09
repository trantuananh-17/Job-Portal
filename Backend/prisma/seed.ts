import { Education, Industry, Language, PrismaClient, Skill } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const data: Language[] = [{ name: 'english' }, { name: 'japanese' }, { name: 'chinese' }];

  await prisma.language.createMany({
    data
  });
}

async function createEducationData() {
  const data = [
    { name: 'Hanoi University of Industry', map: 'https://maps.app.goo.gl/6jboojH9Y5AXikWq6' },
    { name: 'Hanoi University of Science and Technology', map: 'https://maps.app.goo.gl/ZxCF33aKMs87bfoB9' },
    { name: 'National Economics University', map: 'https://maps.app.goo.gl/DFze9esqqiCe6fA48' },
    { name: 'Foreign Trade University', map: 'https://maps.app.goo.gl/q2R3XJmYQzdjLRoU7' },
    { name: 'Thuongmai University', map: 'https://maps.app.goo.gl/GezvMwjS3jK8rXLTA' },
    { name: 'Foreign TradeHanoi University of Civil Engineering', map: 'https://maps.app.goo.gl/2CPFasTivUd324tZ6' }
  ];

  await prisma.education.createMany({ data });
}

async function createSkillData() {
  const data: Skill[] = [
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'Node.js' },
    { name: 'React' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'MongoDB' },
    { name: 'SQL' },
    { name: 'Python' },
    { name: 'Git' },
    { name: 'Vue.js' },
    { name: 'Angular' },
    { name: 'Django' },
    { name: 'C++' },
    { name: 'Java' },
    { name: 'Ruby' },
    { name: 'PHP' },
    { name: 'Docker' },
    { name: 'Kubernetes' },
    { name: 'GraphQL' },
    { name: 'PostgreSQL' },
    { name: 'AWS' },
    { name: 'Azure' },
    { name: 'Google Cloud' },
    { name: 'Linux' },
    { name: 'GitHub' },
    { name: 'C#' },
    { name: 'Swift' },
    { name: 'Unity' },
    { name: 'TensorFlow' },
    { name: 'Machine Learning' },
    { name: 'Data Science' },
    { name: 'CI/CD' }
  ];

  await prisma.skill.createMany({
    data
  });
}

async function createIndustryData() {
  const data: Industry[] = [
    { name: 'Infomation Technology' },
    { name: 'Advertising and marketing' },
    { name: 'Computer and technology' },
    { name: 'Education' },
    { name: 'Finance and economic' }
  ];

  await prisma.industry.createMany({
    data
  });
}

/** SEED DATA
 * Chạy riêng lẻ từng block comment
 * cmd: npx prisma db seed
 */

// main()
//   .then()
//   .catch((err) => console.log(err));

// createEducationData()
//   .then()
//   .catch((err) => console.log(err));

// createSkillData()
//   .then()
//   .catch((err) => console.log(err));

createIndustryData()
  .then()
  .catch((err) => console.log(err));
