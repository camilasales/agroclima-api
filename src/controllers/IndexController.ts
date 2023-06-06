import { Request, Response } from "express";
import { environments } from '../config/environments';

export class IndexController {
    public async get(req: Request, res: Response) {
        try {
            const port = environments.api_port;
            
            let retorno = `[${environments.env}] ${environments.app_name} ${environments.api_version} - funcionando na porta ${port}!`;

            res.json({ message: retorno });
        } catch (e) {
            res.status(412).json({ message: (e as Error).message });
        }
    }
}
