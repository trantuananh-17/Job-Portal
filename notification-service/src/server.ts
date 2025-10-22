import express, { Application, NextFunction, Request, Response } from 'express';
import HttpStatus from './utils/httpStatus';
import logger from './utils/logger';
import { CustomError, NotFoundException } from './utils/errors';
import { healthRoutes } from './routes';
import { config } from './configs/config';
import { Channel } from 'amqplib';
import { consumeApprovedCompanyEmailMessages } from './services/queues/email.consumer';
import { createConnection } from './services/queues/connects';

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
    this.setupGlobalError();
    this.listenServer();
    this.startQueues();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    this.app.use('', healthRoutes());
  }

  private setupGlobalError(): void {
    this.app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundException(`The URL ${req.originalUrl} not found with method ${req.method}`));
    });

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong!'
      });
    });
  }

  private async startQueues(): Promise<void> {
    try {
      const channel: Channel = (await createConnection()) as Channel;
      await consumeApprovedCompanyEmailMessages(channel);
      logger.info('Notification Email Consumer is running...');
    } catch (error) {
      logger.error(' NotificationService startQueues() error:', error);
    }
  }

  private listenServer() {
    const port = config.PORT || 4001;

    this.app.listen(port, async () => {
      logger.info(`Connected to server with port ${port}`);
    });
  }
}
