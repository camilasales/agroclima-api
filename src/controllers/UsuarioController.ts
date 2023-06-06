import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import { Log } from "../helpers/LogsHelper";

const excludeAttributes = {
    exclude: [
        'senha',
        'token',
        'datCadastro',
        'datAtualizacao'
    ]
};

export default class UsuarioController {
    public async cadastrar(req: Request, res: Response) {
        try {
            const dadosUsuarioBody  = req.body;

            let body = {
                nome: dadosUsuarioBody.nome,
                email: dadosUsuarioBody.email,
                telefone: dadosUsuarioBody.telefone,
                senha: dadosUsuarioBody.senha,
                flagAtivo: true
            };

            let data = await Usuario.create(body);

            res.json({
                data: data,
                message: `Usuário ${data.nome} com o id ${data.codUsuario} criado com sucesso`
            });
        } catch (error: any) {
            Log('error', 'UsuarioController', 'cadastrar', error.message, { req: req.body, res: res.statusCode, params: req.params });

            res.status(412).json({ message: (error as Error).message });
        }
    }

    public async ver(req: Request, res: Response) {
        try {
            const where: any = { 
                codUsuario: req.params.codUsuario 
            }

            let data = await Usuario.findOne({
                where: where,
                attributes: excludeAttributes
            });

            res.json(data);
        } catch (error: any) {
            Log('error', 'UsuarioController', 'ver', error.message, { req: req.body, res: res.statusCode, params: req.params });

            res.status(412).json({ message: (error as Error).message });
        }
    }

    public async alterar(req: Request, res: Response) {
        try {
            const dadosUsuarioBody  = req.body;

            let where: any = { 
                codUsuario: req.params.codUsuario 
            };

            const usuario = await Usuario.findOne({
                where: where,
                attributes: excludeAttributes
            });

            if(!usuario) {
                throw new Error('Usuário não encontrado.')
            }

            if(dadosUsuarioBody) {
                usuario.nome = dadosUsuarioBody.nome;
                usuario.email = dadosUsuarioBody.email;
                usuario.telefone = dadosUsuarioBody.telefone;
            }

            await usuario.save();

            delete usuario.dataValues.senha;

            res.json({
                data: usuario,
                message: `Usuário ${usuario.nome} com o id ${usuario.codUsuario} alterado com sucesso`
            });
        } catch (error: any) {
            Log('error', 'UsuarioController', 'alterar', error.message, { req: req.body, res: res.statusCode, params: req.params });

            res.status(412).json({ message: (error as Error).message });
        }
    }
}
