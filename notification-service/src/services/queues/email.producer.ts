import { config } from '@notifications/configs/config';
import logger from '@notifications/utils/logger';
import client, { Channel, ChannelModel } from 'amqplib';

export async function produceApprovedCompanyEmail(): Promise<void> {
  try {
    const connection: ChannelModel = await client.connect(`${config.RABBITMQ_ENDPOINT}`);
    const channel: Channel = await connection.createChannel();
    logger.info(config.RABBITMQ_ENDPOINT);
    const exchangeName = 'job-company-notification';
    const routingKey = 'company-approved-email';
    const queueName = 'company-approved-email-queue';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, routingKey);

    const message = {
      receiverEmail: 'kimmanhh09@gmail.com',
      username: 'Nguyễn Văn A',
      companyName: 'Công ty TNHH ABC',
      planName: 'Gói Premium',
      createdAt: '21/10/2025',
      sender: 'Đội ngũ JobHub',
      message: 'Công ty của bạn đã được phê duyệt! Bạn có thể bắt đầu đăng tin ngay.',
      actionText: 'Truy cập công ty của tôi',
      actionLink: 'https://jobhub.vn/company/abc'
    };

    channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)), {
      persistent: true
    });

    console.log('Message sent to queue:', message);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(' Error in producerApprovedCompanyEmail:', error);
  }
}

produceApprovedCompanyEmail();
