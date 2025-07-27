import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import HttpStatus from './global/constants/http.constant';
import { CustomError, NotFoundException } from './global/core/error.core';
import appRoutes from './global/routes/app.routes';
import cookieParser from 'cookie-parser';

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
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setupRoutes(): void {
    appRoutes(this.app);
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

  private listenServer() {
    const port = process.env.PORT || 5000;

    this.app.listen(port, () => {
      console.log(`Connected to server with port ${port}`);
    });
  }
}
