import path from 'path';

import nodemailer, { Transporter } from 'nodemailer';
import Email from 'email-templates';
import { config } from '@notifications/configs/config';
import { IEmailLocals } from '@notifications/interfaces/email.interface';
import logger from './logger';

async function emailTemplates(template: string, receiver: string, locals: IEmailLocals): Promise<void> {
  try {
    const smtpTransport: Transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.SENDER_EMAIL,
        pass: config.SENDER_EMAIL_PASSWORD
      }
    });
    const email: Email = new Email({
      message: {
        from: `Job Portal <${config.SENDER_EMAIL}>`
      },
      send: true,
      preview: false,
      transport: smtpTransport,
      views: {
        root: path.join(process.cwd(), 'src', 'emails'),
        options: {
          extension: 'ejs'
        }
      },
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, '../build')
        }
      }
    });

    logger.info(path.join(__dirname, '..', 'emails', template));

    await email.send({
      template: path.join(__dirname, '..', 'emails', template),
      message: { to: receiver },
      locals
    });
  } catch (error) {}
}

export { emailTemplates };
