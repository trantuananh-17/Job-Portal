import 'dotenv/config';
import express, { Application, NextFunction, Request, Response } from 'express';
import HttpStatus from './global/constants/http.constant';
import { CustomError, NotFoundException } from './global/core/error.core';
import appRoutes from './global/routes/app.routes';

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
  }

  private setupRoutes(): void {
    appRoutes(this.app);
  }

  private setupGlobalError(): void {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundException(`The URL ${req.originalUrl} not found with method ${req.method}`));
    });

    this.app.use((error: any, res: Response) => {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
          message: error.message
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
