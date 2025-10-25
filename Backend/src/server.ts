import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import HttpStatus from './global/constants/http.constant';
import { CustomError, NotFoundException } from './global/core/error.core';
import appRoutes from './global/routes/app.routes';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import logger from './global/helpers/logger.helper';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { checkElasticConnection } from './global/configs/elastic.config';
import cors from 'cors';
import { Channel } from 'amqplib';
import { createConnection } from './queues/connection';
import { uploadCvConsumer } from './modules/apply/queues/apply.consumer';

let channel: Channel;

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
  }

  public start(): void {
    this.setupMiddleware();
    this.setupSwagger();
    this.setupRoutes();
    this.setupGlobalError();
    this.listenServer();
    this.startQueues();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: process.env.CLIENT_URLS,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    );
    this.loggerMorgan();
    this.setupRateLimit();
  }

  private setupRoutes(): void {
    appRoutes(this.app);
  }

  private async startQueues(): Promise<void> {
    try {
      const channel: Channel = (await createConnection()) as Channel;
      await uploadCvConsumer(channel);
      logger.info('Notification Email Consumer is running...');
    } catch (error) {
      logger.error(' NotificationService startQueues() error:', error);
    }
  }

  private setupSwagger(): void {
    try {
      const specPath = path.resolve(__dirname, '../swagger.yaml');
      const spec = yaml.load(fs.readFileSync(specPath, 'utf8')) as object;

      this.app.get('/docs.json', (_req, res) => res.json(spec));
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
    } catch (e) {
      logger.error('Failed to load OpenAPI spec: %o', e);
    }
  }

  private setupGlobalError(): void {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
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

  private setupRateLimit(): void {
    if (process.env.NODE_ENV === 'production') {
      const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Quá nhiều yêu cầu từ địa chỉ IP này, vui lòng thử lại sau 15 phút!'
      });
      this.app.use('/api', apiLimiter);

      const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: 'Bạn đã thử đăng nhập quá nhiều lần, vui lòng thử lại sau 15 phút!'
      });
      this.app.use('/api/v1/auth/login', loginLimiter);
    }
  }

  private loggerMorgan(): void {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(
        morgan('combined', {
          stream: {
            write: (message) => logger.http(message.trim())
          }
        })
      );
    }
  }

  private listenServer() {
    const port = process.env.PORT || 5000;

    this.app.listen(port, async () => {
      logger.info(`Connected to server with port ${port}`);
      logger.info(`Swagger UI: http://localhost:${port}/docs`);

      const esStatus = await checkElasticConnection();
      if (esStatus.success) {
        logger.info(`Elasticsearch connected. Cluster health: ${esStatus.status}`);
      } else {
        logger.error(`Elasticsearch connection failed: ${esStatus.error}`);
      }
    });
  }
}

export { channel };
