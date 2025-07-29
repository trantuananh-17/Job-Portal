import { Education, Language, PrismaClient } from '@prisma/client';
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

// main()
//   .then()
//   .catch((err) => console.log(err));

createEducationData()
  .then()
  .catch((err) => console.log(err));
