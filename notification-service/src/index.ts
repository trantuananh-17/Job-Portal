import { Server } from './server';

class NotificationService {
  public run(): void {
    const server = new Server();

    server.start();
  }
}

const notificationService = new NotificationService();
notificationService.run();
