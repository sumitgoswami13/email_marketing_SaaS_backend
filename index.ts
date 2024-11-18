import express, { Application } from 'express';
import 'reflect-metadata';
const cors = require('cors')
import dotenv from 'dotenv';
import DatabaseConnection from './config/db,cnofig';
import { User } from './models/user';


dotenv.config();

class Server {
  private app: Application;
  private port: string | number;
  private db: DatabaseConnection;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this. db = new DatabaseConnection()
    this.middlewares();
    this.routes();
    this.inititlizeDb();
    this.initilizeRepositories()
    this.initilizeServices()
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`);
      next();
    });
  }

  private initilizeRepositories():void{

  }

  private initilizeServices(): void{

  }
  private inititlizeDb(): void{
    this.db.connectDb()
  }


  private routes(): void {
    this.app.get('/', (req, res) => {
      res.json({ message: 'Hello, World!' });
    });
    this.app.use('/api/example', (req, res) => {
      res.json({ message: 'This is an example route.' });
    });
  }

  public async listen(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default Server;

const server : Server = new Server()
server.listen()
