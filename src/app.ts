// application.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './modules/student/student.route';

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


    this.App.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'Nexen-Univesity on Fire 🔥🔥🔥',
      });
    });
  }
}

export default new Application();
