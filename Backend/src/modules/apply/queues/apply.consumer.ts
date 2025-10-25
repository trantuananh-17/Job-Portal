import { Channel, ConsumeMessage } from 'amqplib';
import { createConnection } from '~/queues/connection';
import { IApplyMessage } from '../interfaces/apply.interface';
import logger from '~/global/helpers/logger.helper';
import { v4 as uuidv4 } from 'uuid';
import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '~/global/configs/s3.config';
import { applyRepository } from '../repositories/implements/apply.repository.impl';

export async function uploadCvConsumer(channel: Channel): Promise<void> {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'apply-job';
    const routingKey = 'upload-cv';
    const queueName = 'upload-cv-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
      if (!msg) return;

      const { candidateProfileId, jobId, cv } = JSON.parse(msg!.content.toString());

      const bucketName = process.env.AWS_NAME;

      const id = uuidv4();
      const key = `uploads/cv/${id}-${cv.originalname}`;
      const buffer = Buffer.from(cv.file, 'base64');

      const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: cv.mimeType,
        ACL: ObjectCannedACL.public_read
      };

      await s3.send(new PutObjectCommand(params));

      const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      await applyRepository.updateCv(candidateProfileId, jobId, url);
      logger.info(` Uploaded CV and updated DB for candidateId=${candidateProfileId}, jobId=${jobId}`);

      channel.ack(msg);
    });
  } catch (error) {
    logger.log('error', 'NotificationService EmailConsumer consumeAuthEmailMessages() method error:', error);
  }
}
