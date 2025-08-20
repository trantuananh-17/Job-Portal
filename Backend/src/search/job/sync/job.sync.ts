import { esClient } from '~/global/configs/elastic.config';
import { JobDocument } from '../mapper/job.mapper';

const INDEX = 'jobs';

export class JobSyncService {
  private readonly index: string;

  constructor(indexName: string = INDEX) {
    this.index = indexName;
  }

  async indexJob(job: JobDocument): Promise<void> {
    await esClient.index({
      index: this.index,
      id: job.id.toString(),
      document: job
    });
  }

  async updateJob(job: JobDocument): Promise<void> {
    await esClient.update({
      index: this.index,
      id: job.id.toString(),
      doc: job
    });
  }

  async deleteJob(jobId: number): Promise<void> {
    await esClient.delete({
      index: this.index,
      id: jobId.toString()
    });
  }

  async getJob(jobId: number): Promise<JobDocument | null> {
    try {
      const result = await esClient.get({
        index: this.index,
        id: jobId.toString()
      });
      return result._source as JobDocument;
    } catch (error: any) {
      if (error.meta?.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }
}
