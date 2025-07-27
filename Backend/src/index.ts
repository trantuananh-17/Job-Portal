import { Server } from './server';

class JobPortalApplication {
  public run(): void {
    const server = new Server();

    server.start();
  }
}

const jobPortalApplication = new JobPortalApplication();
jobPortalApplication.run();
