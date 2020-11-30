import bodyParser from 'body-parser';
import express, { Express } from 'express';

export default class Server {
  private app!: Express;

  private port!: number;

  constructor(port: number = 3000) {
    this.port = port;
  }

  init() {
    this.setupExpress();
  }

  private setupExpress() {
    this.app = express();

    this.app.use(bodyParser.json());

    this.app.get('/', (req, res) => {
      res.send({
        message: 'Hello world',
      });
    });
  }

  getApp(): Express | undefined {
    return this.app;
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`Ready at http://localhost:${this.port}`);
    });
  }
}
