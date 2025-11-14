import { PrismaClient } from '@prisma/client';
import logger from './global/helpers/logger.helper';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
    { level: 'error', emit: 'stdout' }
  ]
});

// Log query + time
prisma.$on('query', (e) => {
  logger.info(` QUERY: ${e.query}`);
  logger.info(`Duration: ${e.duration}ms`);
});

export default prisma;
