import { Language, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const data: Language[] = [{ name: 'english' }, { name: 'japanese' }, { name: 'chinese' }];

  await prisma.language.createMany({
    data
  });
}

main()
  .then()
  .catch((err) => console.log(err));
