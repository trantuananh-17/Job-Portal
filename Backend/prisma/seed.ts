import { Education, Industry, JobRole, Language, PrismaClient, Skill } from '@prisma/client';

const prisma = new PrismaClient();

class SeedData {
  async seedLanguages() {
    const data: Language[] = [{ name: 'english' }, { name: 'japanese' }, { name: 'chinese' }];
    await prisma.language.createMany({ data });
  }

  async seedEducations() {
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

  async seedSkills() {
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
    await prisma.skill.createMany({ data });
  }

  async seedIndustries() {
    const data: Industry[] = [
      { name: 'Information Technology' },
      { name: 'Advertising and marketing' },
      { name: 'Computer and technology' },
      { name: 'Education' },
      { name: 'Finance and economic' }
    ];
    await prisma.industry.createMany({ data });
  }

  async seedJobRoles() {
    const data: JobRole[] = [
      { name: 'senior' },
      { name: 'fresher' },
      { name: 'internship' },
      { name: 'junior' },
      { name: 'middle' }
    ];
    await prisma.jobRole.createMany({ data });
  }

  async run() {
    try {
      console.log('Seeding data...');
      await this.seedLanguages();
      await this.seedEducations();
      await this.seedSkills();
      await this.seedIndustries();
      await this.seedJobRoles();
      console.log('All data seeded successfully!');
    } catch (err) {
      console.error('Error seeding data:', err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

new SeedData().run();
