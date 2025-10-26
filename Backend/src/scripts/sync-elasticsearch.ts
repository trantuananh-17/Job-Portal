import { PrismaClient } from '@prisma/client';
import { esClient } from '~/global/configs/elastic.config';
import { JobDocument } from '~/search/job/mapper/job.mapper';
import logger from '~/global/helpers/logger.helper';
import { JobSyncService } from '~/search/job/sync/job.sync';

const prisma = new PrismaClient();
const jobSyncService = new JobSyncService('jobs');

async function fullSyncJobsToElasticsearch() {
  logger.info(' [START] Full resync: PostgreSQL -> Elasticsearch');

  try {
    const exists = await jobSyncService.checkIfIndexExist('jobs');
    if (exists) {
      await esClient.indices.delete({ index: 'jobs' });
      logger.warn(' Deleted existing index "jobs".');
    }
  } catch (err) {
    logger.error('Error deleting index:', err);
  }

  await jobSyncService.createIndex();
  logger.info(' Created new index "jobs".');

  const jobs = await prisma.job.findMany({
    include: {
      company: { select: { id: true, name: true, address: true, avatarUrl: true } },
      postBy: { select: { id: true, name: true } }
    }
  });

  logger.info(` Found ${jobs.length} jobs in DB. Start indexing...`);

  const bulkBody: any[] = [];
  for (const job of jobs) {
    const doc: JobDocument = {
      id: job.id,
      title: job.title,
      title_suggest: {
        input: [job.title]
      },
      description: job.description,
      jobRoleName: job.jobRoleName,
      status: job.status,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary ?? undefined,
      companyId: job.company.id,
      companyName: job.company?.name,
      logo: job.company?.avatarUrl ?? '',
      address: job.company.address ?? '',
      recruiter: job.postBy?.name ?? '',
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt?.toISOString() ?? '',
      expirationDate: job.expirationDate ? job.expirationDate.toISOString() : undefined,
      activeDays: job.activeDays ?? undefined,
      isDeleted: job.isDeleted
    };

    bulkBody.push({ index: { _index: 'jobs', _id: job.id.toString() } });
    bulkBody.push(doc);
  }

  if (bulkBody.length > 0) {
    const result = await esClient.bulk({ body: bulkBody, refresh: true });

    if (result.errors) {
      const failed = result.items.filter((i: any) => i.index?.error);
      logger.error(` ${failed.length} documents failed to index`);
    } else {
      logger.info(` Successfully reindexed ${jobs.length} jobs.`);
    }
  }

  logger.info(' [DONE] Full resync completed.');
  await prisma.$disconnect();
}

fullSyncJobsToElasticsearch().catch((err) => {
  logger.error('Full sync failed:', err);
  prisma.$disconnect();
});
