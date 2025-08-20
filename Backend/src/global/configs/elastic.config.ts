import { Client } from '@elastic/elasticsearch';

export const esClient = new Client({
  node: process.env.ELASTIC_URL!,
  auth: {
    username: process.env.ELASTIC_USERNAME!,
    password: process.env.ELASTIC_PASSWORD!
  },
  tls: {
    rejectUnauthorized: false
  }
});
