import { NextFunction, Request, Response } from "express";
import { validaCpfCnpj } from "../helpers/ValidatorHelper";
import { Usuario } from "../models/Usuario";
import { Log } from "../helpers/LogsHelper";
import { Op } from "sequelize";


export default class UsuarioValidator {
    public async validarUsuarioCadastrar(req: Request, res: Response, next: NextFunction) {
        try {
            const dadosUsuarioBody = req.body;

            if(!dadosUsuarioBody.nome) {
                throw new Error('Nome não informado.');
            }
            
            if(!dadosUsuarioBody.telefone) {
                throw new Error('Telefone não informado.');
            }

            if(!dadosUsuarioBody.email) {
                throw new Error('E-mail não informado');
            }

            const email = await Usuario.findOne({ 
                where: { email: dadosUsuarioBody.email}
            });

            if(email) {
                throw new Error('Este E-mail já foi cadastrado.');
            }

            if(!dadosUsuarioBody.senha) {
                throw new Error('Senha não informada');
            }

            if(!dadosUsuarioBody.confirmacaoSenha) {
                throw new Error('Confirmação de senha não informada');
            }

            if(dadosUsuarioBody.senha != dadosUsuarioBody.confirmacaoSenha) {
                throw new Error('As senhas não conferem.');
            }

            next();
        } catch (error: any) {
            Log('error', 'UsuarioValidator', 'validarUsuario', error.message, { req: req.body, res: res.statusCode, params: req.params });
            res.status(412).json({ message: (error as Error).message });
        }

    };

    public async validarUsuarioAlterar(req: Request, res: Response, next: NextFunction) {
        try {
            const dadosUsuarioBody = req.body;

            if(dadosUsuarioBody.email){
                const email = await Usuario.findOne({ where: {
                    email: dadosUsuarioBody.email
                }});
    
                if(email) {
                    throw new Error('Este E-mail já foi cadastrado.');
                }
            }

            if(dadosUsuarioBody.senha){
    
                if(!dadosUsuarioBody.confirmacaoSenha) {
                    throw new Error('Confirmação de senha não informada');
                }
    
                if(dadosUsuarioBody.senha != dadosUsuarioBody.confirmacaoSenha) {
                    throw new Error('As senhas não conferem.');
                }
            }

            next();
        } catch (error: any) {
            console.log(error)
            Log('error', 'UsuarioValidator', 'validarUsuario', error.message, { req: req.body, res: res.statusCode, params: req.params });
            res.status(412).json({ message: (error as Error).message });
        }

    };

}
