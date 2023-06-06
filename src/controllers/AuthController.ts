import { Request, Response } from "express";
import { Usuario} from "../models/Usuario";
import { LogAcesso } from "../models/LogAcesso";
import { Log } from "../helpers/LogsHelper";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { environments } from "../config/environments";

export default class AuthController {

    constructor() {}

    public async login(req: Request, res: Response) {
        try {
            if (!req.body.email) {
                throw new Error(`O campo 'email' não foi informado`);
            }
            if (!req.body.senha) {
                throw new Error(`O campo 'senha' não foi informado`);
            }

            let usuario = await Usuario.findOne({
                where: { email: req.body.email },
            });

            if (!usuario) {
                throw new Error(`Nenhuma conta de usuário com o email '${req.body.email}' foi encontrada.`);
            }

            if(!usuario.dataValues.flagAtivo) {
                throw new Error('Não foi possível efetuar o login. Entre em contato com o administrador.');
            }

            let dataSenha: any = usuario.senha;
            let resposta = await bcrypt.compare(req.body.senha, dataSenha);

            if (!resposta) {
                throw new Error("Senha inválida");
            }

            const jsonRequest = usuario;
            delete jsonRequest.senha;

            await LogAcesso.create({
                jsonRequest: jsonRequest,
                descricao: `O usuário "${jsonRequest.codUsuario} - ${jsonRequest.nome}" logou no sistema`
            });

            let jwtSecret: any = environments.jwt_secret;
            let payload = { codUsuario: usuario.codUsuario };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '8h' });

            await Usuario.update(
                {
                    token: token,
                },
                { where: { codUsuario: usuario.codUsuario } }
            );

            res.json({
                token: token,
                email: usuario.email,
                nome: usuario.nome,
            });

        } catch (error: any) {
            Log('error', 'AuthController', 'login', error.message, { req: req.body, res: res.statusCode, params: req.params });

            res.status(412).json({ message: (error as Error).message });
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            let user: any = req?.user;

            let data = await Usuario.findOne({
                where: { codUsuario: user.codUsuario }
            });

            delete data?.senha;

            res.json(data);
        } catch (error: any) {
            Log('error', 'AuthController', 'login', error.message, { req: req.body, res: res.statusCode, params: req.params });

            res.status(412).json({ message: (error as Error).message });
        }
    }
}