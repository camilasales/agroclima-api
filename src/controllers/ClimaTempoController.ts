import { Request, Response } from "express";
import { Log } from "../helpers/LogsHelper";
import MeteumProvider from "../providers/meteum/MeteumProvider";

export default class ClimaTempoController {
    public async obterClimaAtualByLocal(req: Request, res: Response) {
        try {
            const {latitude, longitude} = req.body;                        
            const meteumProvider = new MeteumProvider(latitude, longitude);
            let result = await meteumProvider.getClimaAtual();

            res.status(200).json({ "result": result });
        } catch (e) {
            res.status(412).json({ message: (e as Error).message });
        }
    }

    public async obterPrevisaoTempo(req: Request, res: Response) {
        try {
            const {latitude, longitude, limiteDias} = req.body;            
            const meteumProvider = new MeteumProvider(latitude, longitude);
            let result = await meteumProvider.getPrevisaoTempo(limiteDias);

            res.status(200).json({ "result": result });
        } catch (e) {
            res.status(412).json({ message: (e as Error).message });
        }
    }
    
    public async obterPrevisaoChuva(req: Request, res: Response) {
        try {
            const {latitude, longitude} = req.body;                    
            const meteumProvider = new MeteumProvider(latitude, longitude);
            let result = await meteumProvider.getPrevisaoChuva();

            res.status(200).json({ "result": result });
        } catch (e) {
            res.status(412).json({ message: (e as Error).message });
        }
    }
}
