import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './middlewires/globalErrorHandler';
import notFound from './middlewires/notFound';

class Application {
  public App: express.Application;

  constructor() {
    this.App = express();
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.App.use(express.json());
    this.App.use(cors());
  }

  private routes() {
    //Application Routes
    this.App.use('/api/v1/student', StudentRoutes);
    this.App.use('/api/v1/user', UserRoutes);

    this.App.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'Nexen-Univesity on Fire 🔥🔥🔥',
      });
    });

    //Global error handel
    this.App.use(globalErrorHandler);

    //Not found
    this.App.use(notFound)
  }
}

export default new Application();
