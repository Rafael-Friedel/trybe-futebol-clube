import * as cors from 'cors';
import * as express from 'express';
import 'express-async-errors';
import MidlewareOfError from './database/midleware/HandleError';
import routerLeaderboard from './routes/leaderboard.route';
import routerLogin from './routes/login.route';
import routerMatch from './routes/match.route';
import routerTeams from './routes/teams.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use(cors());
    this.app.use('/login', routerLogin);
    this.app.use('/teams', routerTeams);
    this.app.use('/matches', routerMatch);
    this.app.use('/leaderboard', routerLeaderboard);

    this.app.use(MidlewareOfError.HandleError);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
