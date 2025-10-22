import { Channel } from 'amqplib';
import logger from '~/global/helpers/logger.helper';
import { createConnection } from '~/queues/connection';

export const publishDirectMessage = async (
  channel: Channel,
  exchangeName: string, // Tên exchange muốn gửi
  routingKey: string, // Key để định tuyến
  message: string,
  logMessage: string
): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    await channel.assertExchange(exchangeName, 'direct');
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    logger.info(logMessage);
  } catch (error) {
    logger.log('error', 'CompanyService CompanyServiceProducer publishDirectMessage() method:', error);
  }
};
