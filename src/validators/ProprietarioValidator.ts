import { NextFunction, Request, Response } from "express";
import { validaCpfCnpj } from "../helpers/ValidatorHelper";
import { Proprietario } from "../models/Proprietario";
import { Log } from "../helpers/LogsHelper";
import { Op } from "sequelize";


export default class ProprietarioValidator {
    public async validarProprietarioCadastrar(req: Request, res: Response, next: NextFunction) {
        try {
            const dadosProprietarioBody = req.body;

            if(!dadosProprietarioBody.nome) {
                throw new Error('Nome não informado.');
            }

            if(!validaCpfCnpj(dadosProprietarioBody.cpfCnpj)) {
                throw new Error('CPF/CNPJ inválido');
            }

            const cpfCnpj = await Proprietario.findOne({ 
                where: { cpfCnpj: dadosProprietarioBody.cpfCnpj}
            });

            if(cpfCnpj) {
                throw new Error('Este CPF/CNPJ já foi cadastrado.');
            }

            if(dadosProprietarioBody.cpfCnpj.length > 11){

                if(!dadosProprietarioBody.razaoSocial) {
                    throw new Error('Razao Social não informado.');
                }
    
                if(!dadosProprietarioBody.nomeFantasia) {
                    throw new Error('Nome Fantasia não informado.');
                }
            }

            next();
        } catch (error: any) {
            Log('error', 'ProprietarioValidator', 'validarProprietario', error.message, { req: req.body, res: res.statusCode, params: req.params });
            res.status(412).json({ message: (error as Error).message });
        }

    };

}
