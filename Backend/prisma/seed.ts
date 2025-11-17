import {
  Education,
  Industry,
  JobRole,
  Language,
  Order,
  Package,
  PrismaClient,
  RecruiterPackage,
  Role,
  Skill
} from '@prisma/client';

const prisma = new PrismaClient();

class SeedData {
  async seedUsers() {
    const data = [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: '123456',
        role: 'ADMIN' as Role,
        isActive: true,
        isVerified: true,
        isDeleted: false,
        avatarUrl: null,
        avatarKey: null
      },
      {
        name: 'Candidate',
        email: 'candidate@example.com',
        password: '123456',
        role: 'CANDIDATE' as Role,
        isActive: true,
        isVerified: true,
        isDeleted: false,
        avatarUrl: null,
        avatarKey: null
      },
      {
        name: 'Recruiter',
        email: 'recruiter@example.com',
        password: '123456',
        role: 'RECRUITER' as Role,
        isActive: true,
        isVerified: true,
        isDeleted: false,
        avatarUrl: null,
        avatarKey: null
      }
    ];
    await prisma.user.createMany({ data, skipDuplicates: true });
  }

  async seedLanguages() {
    const data: Language[] = [{ name: 'english' }, { name: 'japanese' }, { name: 'chinese' }];
    await prisma.language.createMany({ data, skipDuplicates: true });
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
    await prisma.education.createMany({ data, skipDuplicates: true });
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
    await prisma.skill.createMany({ data, skipDuplicates: true });
  }

  async seedIndustries() {
    const data: Industry[] = [
      { name: 'Information Technology' },
      { name: 'Advertising and marketing' },
      { name: 'Computer and technology' },
      { name: 'Education' },
      { name: 'Finance and economic' }
    ];
    await prisma.industry.createMany({ data, skipDuplicates: true });
  }

  async seedJobRoles() {
    const data: JobRole[] = [
      { name: 'senior' },
      { name: 'fresher' },
      { name: 'internship' },
      { name: 'junior' },
      { name: 'middle' }
    ];
    await prisma.jobRole.createMany({ data, skipDuplicates: true });
  }

  async seedPackage() {
    const data: Package[] = [
      {
        id: 1,
        label: 'Basic Recruiter',
        price: 49.99,
        jobPostLimit: 3,
        isActive: true,
        createdAt: new Date('2024-11-01'),
        updatedAt: null
      },
      {
        id: 2,
        label: 'Pro Recruiter',
        price: 99.99,
        jobPostLimit: 10,
        isActive: true,
        createdAt: new Date('2024-11-01'),
        updatedAt: null
      },
      {
        id: 3,
        label: 'Enterprise Recruiter',
        price: 199.99,
        jobPostLimit: 30,
        isActive: true,
        createdAt: new Date('2024-11-01'),
        updatedAt: null
      }
    ];

    await prisma.package.createMany({ data, skipDuplicates: true });
  }
  async seedRecruiterPackage() {
    const data: RecruiterPackage[] = [
      {
        id: 1,
        recruiterId: 3,
        packageId: 1,
        startDate: new Date('2024-11-01'),
        endDate: new Date('2024-12-01')
      },
      {
        id: 2,
        recruiterId: 3,
        packageId: 2,
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-02-01')
      },
      {
        id: 3,
        recruiterId: 3,
        packageId: 3,
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-01')
      }
    ];

    await prisma.recruiterPackage.createMany({ data, skipDuplicates: true });
  }
  async seedOrder() {
    const data: Order[] = [
      {
        id: 1,
        recruiterId: 3,
        packageId: 1,
        totalPrice: 49.99,
        status: 'SUCCESS',
        orderDate: new Date('2024-11-01')
      },
      {
        id: 2,
        recruiterId: 3,
        packageId: 2,
        totalPrice: 99.99,
        status: 'PENDING',
        orderDate: new Date('2025-01-01')
      },
      {
        id: 3,
        recruiterId: 3,
        packageId: 3,
        totalPrice: 199.99,
        status: 'FAILED',
        orderDate: new Date('2024-03-01')
      }
    ];

    await prisma.order.createMany({ data, skipDuplicates: true });
  }

  async run() {
    try {
      console.log('Seeding data...');
      await this.seedUsers();
      await this.seedLanguages();
      await this.seedEducations();
      await this.seedSkills();
      await this.seedIndustries();
      await this.seedJobRoles();
      await this.seedPackage();
      await this.seedRecruiterPackage();
      await this.seedOrder();

      console.log('All data seeded successfully!');
    } catch (err) {
      console.error('Error seeding data:', err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

new SeedData().run();
