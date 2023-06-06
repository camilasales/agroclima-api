import { Request, Response } from "express";
import { Proprietario } from "../models/Proprietario";
import { Log } from "../helpers/LogsHelper";
import { Usuario } from "../models/Usuario";

export default class ProprietarioController {
    public async cadastrar(req: Request, res: Response) {
        try {
            const userLogado: any = req.user;
            const dadosProprietarioBody = req.body;
            
            await Proprietario.create({
                codUsuario: userLogado.codUsuario,
                nome: dadosProprietarioBody.nome,
                razaoSocial: dadosProprietarioBody.razaoSocial,
                nomeFantasia: dadosProprietarioBody.nomeFantasia,
                cpfCnpj: dadosProprietarioBody.cpfCnpj,
                flagAtivo: true
            });

            res.status(200).json(dadosProprietarioBody);

        } catch (error :any) {
            Log('error', 'ProprietarioController', 'cadastrar', error, { req: req.body, res: res.statusCode, params: req.params });
            res.status(412).json({ message: error.message });
        }
    }

    public async ver(req: Request, res: Response) {
        try {
            const proprietario = await Proprietario.findOne({
                where: { codEmpresa: req.params.codEmpresa },
                include: { model: Usuario, attributes: {exclude:['senha']}, order: [ ['codUsuario', 'ASC'] ], limit: 1 }
            });

            res.status(200).json(proprietario)
        } catch (error: any) {
            Log('error', 'ProprietarioController', 'ver', error, { req: req.body, res: res.statusCode, params: req.params });
            res.status(412).json({ message: error });
        }
    }

    public async alterar(req: Request, res: Response) {
        try {
            const dadosProprietarioBody = req.body;

            let where: any = { 
                codProprietario: req.params.codProprietario 
            };

            const proprietario = await Proprietario.findOne({
                where: where
            });

            if(!proprietario) {
                throw new Error('Usuário não encontrado.')
            }

            if(dadosProprietarioBody) {
                proprietario.nome = dadosProprietarioBody.nome;
            }

            await proprietario.save();

            delete proprietario.dataValues.senha;

            res.json({
                data: proprietario,
                message: `Proprietário ${proprietario.nome} com o id ${proprietario.codProprietario} alterado com sucesso`
            });
        } catch (error: any) {
            Log('error', 'ProprietarioController', 'alterar', error.message, { req: req.body, res: res.statusCode, params: req.params });

            res.status(412).json({ message: (error as Error).message });
        }
    }

}
