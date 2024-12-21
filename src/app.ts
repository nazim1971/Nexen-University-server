import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewires/globalErrorHandler';
import notFound from './app/middlewires/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

class Application {
  public App: express.Application;

  constructor() {
    this.App = express();
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.App.use(express.json());
    this.App.use(cookieParser())
    this.App.use(cors());
  }

  private routes() {
    //Application Routes
    this.App.use('/api/v1', router);
    this.App.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'Nexen-Univesity on Fire 🔥🔥🔥',
      });
    });

    //Global error handel
    this.App.use(globalErrorHandler);

    //Not found
    this.App.use(notFound);
  }
}

export default new Application();
