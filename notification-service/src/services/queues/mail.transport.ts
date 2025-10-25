import { IEmailLocals } from '@notifications/interfaces/email.interface';
import { emailTemplates } from '@notifications/utils/emailTempaltes';
import logger from '@notifications/utils/logger';

async function sendEmail(template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> {
  try {
    emailTemplates(template, receiverEmail, locals);
    logger.info('Email sent successfully.');
  } catch (error) {
    logger.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
  }
}

export { sendEmail };
