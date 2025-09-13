import { esClient } from '~/global/configs/elastic.config';
import { JobDocument } from '../mapper/job.mapper';
import logger from '~/global/helpers/logger.helper';

const INDEX = 'jobs';

export class JobSyncService {
  private readonly index: string;

  constructor(indexName: string = INDEX) {
    this.index = indexName;
  }

  async checkIfIndexExist(indexName: string): Promise<boolean> {
    const result: boolean = await esClient.indices.exists({ index: indexName });
    return result;
  }

  async createIndex(): Promise<void> {
    const exists = await this.checkIfIndexExist(this.index);
    if (exists) return;

    try {
      await esClient.indices.create({
        index: this.index,
        settings: {
          index: {
            number_of_shards: 1,
            number_of_replicas: 0,
            refresh_interval: '1s'
          },
          analysis: {
            tokenizer: {
              ngram_tokenizer: {
                type: 'ngram',
                min_gram: 3,
                max_gram: 4,
                token_chars: ['letter', 'digit']
              }
            },
            analyzer: {
              ngram_analyzer: {
                type: 'custom',
                tokenizer: 'ngram_tokenizer',
                filter: ['lowercase']
              }
            }
          }
        },
        mappings: {
          properties: {
            id: { type: 'keyword' },
            title: {
              type: 'text',
              analyzer: 'standard',
              fields: {
                ngram: {
                  type: 'text',
                  analyzer: 'ngram_analyzer',
                  search_analyzer: 'ngram_analyzer'
                },
                raw: { type: 'keyword', ignore_above: 256 }
              }
            },
            description: { type: 'text', analyzer: 'standard' },
            status: { type: 'keyword' },
            jobRoleName: { type: 'keyword' },
            minSalary: { type: 'integer' },
            maxSalary: { type: 'integer' },
            companyName: { type: 'keyword' },
            recruiter: { type: 'keyword' },
            skills: { type: 'keyword' },
            benefits: { type: 'keyword' },
            createdAt: { type: 'date' },
            isDeleted: { type: 'boolean' }
          }
        }
      });
      logger.info(`Index ${this.index} created.`);
    } catch (e: any) {
      if (e?.meta?.body?.error?.type !== 'resource_already_exists_exception') throw e;
    }
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
