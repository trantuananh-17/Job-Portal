import { config } from '@notifications/configs/config';
import { IEmailLocals } from '@notifications/interfaces/email.interface';
import logger from '@notifications/utils/logger';
import { Channel, ConsumeMessage } from 'amqplib';
import { createConnection } from './connects';
import { sendEmail } from './mail.transport';

async function consumeAuthEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'job-email-notification';
    const routingKey = 'auth-email';
    const queueName = 'auth-email-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
      const { receiverEmail, username, verifyLink, resetLink, template, type } = JSON.parse(msg!.content.toString());
      const locals: IEmailLocals = {
        appLink: `${config.CLIENT_URL}`,
        appIcon: 'https://i.ibb.co/Kyp2m0t/cover.png',
        username,
        verifyLink,
        resetLink,
        type
      };
      await sendEmail(template, receiverEmail, locals);
      channel.ack(msg!);
    });
  } catch (error) {
    logger.log('error', 'NotificationService EmailConsumer consumeAuthEmailMessages() method error:', error);
  }
}

async function consumeApprovedCompanyEmailMessages(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'job-company-notification';
    const routingKey = 'company-approved-email';
    const queueName = 'company-approved-email-queue';

    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    const companyQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(companyQueue.queue, exchangeName, routingKey);

    channel.consume(companyQueue.queue, async (msg: ConsumeMessage | null) => {
      if (!msg) return;

      const {
        receiverEmail,
        username,
        companyName,
        planName,
        createdAt,
        sender,
        actionLink,
        actionText,
        message,
        subject
      } = JSON.parse(msg.content.toString());

      const locals: IEmailLocals = {
        appLink: `${config.CLIENT_URL}`,
        appIcon: '',
        username,
        companyName,
        planName,
        createdAt,
        sender: sender,
        header: 'Chúc mừng, công ty của bạn đã được duyệt!',
        message: message,
        actionText: actionText,
        actionLink: actionLink,
        subject
      };

      await sendEmail('companyApproved', receiverEmail, locals);

      channel.ack(msg);
    });
  } catch (error) {
    logger.log('error', 'NotificationService EmailConsumer consumeApprovedCompanyEmailMessages() method error:', error);
  }
}

export { consumeAuthEmailMessages, consumeApprovedCompanyEmailMessages };
