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

export const checkElasticConnection = async () => {
  try {
    const health = await esClient.cluster.health();
    return { success: true, status: health.status };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
