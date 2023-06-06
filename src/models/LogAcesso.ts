import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class LogAcesso extends Model {
    public readonly codLogAcesso?: number;
    public jsonRequest?: JSON;
    public descricao?: string;
    public readonly dat_cadastro?: Date;
    public readonly dat_atualizacao?: Date;
}

export interface LogAcessoInterface {
    codLogAcesso?: number;
    jsonRequest?: JSON;
    descricao?: string;
}

LogAcesso.init({
    codLogAcesso: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    jsonRequest: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'log_acesso',
    sequelize: sequelize,
    updatedAt: 'datAtualizacao',
    createdAt: 'datCadastro',
    freezeTableName: true,
    timestamps: true
});

LogAcesso.sync({ force: false }).then(() => {
    console.log(`tabela 'log_acesso' criada`);
});
