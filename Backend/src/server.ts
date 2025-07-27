import express, { Application } from 'express';
import 'dotenv/config';
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

  private setupGlobalError(): void {}

  private listenServer() {
    const port = process.env.PORT || 5000;

    this.app.listen(port, () => {
      console.log(`Connected to server with port ${port}`);
    });
  }
}
