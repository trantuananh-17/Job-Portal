import { config } from '@notifications/configs/config';
import logger from '@notifications/utils/logger';
import client, { Channel, ChannelModel } from 'amqplib';

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: ChannelModel = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    logger.info('Notification server connected to queue successfully...');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    logger.log('error', 'NotificationService error createConnection() method:', error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: ChannelModel): void {
  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
  });
}

export { createConnection };
