import express from 'express';
import cors from 'cors';
import { Routes } from '../routes/routes';

import { logs } from '../middlewares/logs.middleware';
import fs from 'fs';
import session from 'express-session';
import { environments } from './environments';

class App {
    public app: express.Application;
    public route: Routes = new Routes();

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.config();
        this.middlewares();
        this.route.routes(this.app);
        this.setViewEngine();

        this.createFolders('./logs');
        this.createFolders('./private');
        this.createFolders('./public');
    }

    private config(): void {
        let secret: any = environments.jwt_secret;
        this.app.use(session({ secret: secret }));
        this.app.use(cors());
    }

    private middlewares(): void {
        this.app.use(logs);
    }

    private setViewEngine() {
        this.app.use(express.static(__dirname + '/../assets/'));
    }

    private createFolders(pathFolder: string) {
        if (!fs.existsSync(pathFolder)) {
            fs.mkdir(pathFolder, { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log(`Diretório ${pathFolder} criado com sucesso`);
            });
        }
    }
}

export default new App().app
