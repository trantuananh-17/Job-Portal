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
          analysis: {
            filter: {
              vn_ascii: { type: 'asciifolding', preserve_original: true }
            },
            tokenizer: {
              mid_ngram_tok: { type: 'ngram', min_gram: 2, max_gram: 3, token_chars: ['letter', 'digit'] }
            },
            analyzer: {
              mid_ngram_an: { type: 'custom', tokenizer: 'mid_ngram_tok', filter: ['lowercase', 'vn_ascii'] },
              std_fold: { type: 'custom', tokenizer: 'standard', filter: ['lowercase', 'vn_ascii'] }
            }
          }
        },
        mappings: {
          properties: {
            id: { type: 'keyword' },
            title: {
              type: 'search_as_you_type',
              analyzer: 'std_fold',
              search_analyzer: 'std_fold',
              fields: {
                ngram: {
                  type: 'text',
                  analyzer: 'mid_ngram_an',
                  search_analyzer: 'std_fold'
                }
              }
            },
            description: { type: 'text', analyzer: 'std_fold' },
            status: { type: 'keyword' },
            jobRoleName: { type: 'keyword' },
            minSalary: { type: 'integer' },
            maxSalary: { type: 'integer' },
            companyId: { type: 'keyword' },
            companyName: { type: 'keyword', normalizer: 'lowercase' },
            address: { type: 'keyword', normalizer: 'lowercase' },
            jobRoles: { type: 'keyword', normalizer: 'lowercase' },
            recruiter: { type: 'keyword' },
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
