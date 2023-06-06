import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Usuario } from "./Usuario";

export class Proprietario extends Model {
    public readonly codProprietario?: bigint;
    public codUsuario?: bigint;
    public nome?: string;
    public razaoSocial?: string;
    public nomeFantasia?: string;
    public cpfCnpj?: string;
    public flagAtivo?: number;
    public readonly datCadastro?: Date;
    public readonly datAtualizacao?: Date;
}

export interface ProprietarioInterface {
    codProprietario?: bigint;
    codUsuario?: bigint;
    nome?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    cpfCnpj?: string;
    flagAtivo?: number;
}

Proprietario.init({
    codProprietario: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    codUsuario: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    razaoSocial: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    nomeFantasia: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    cpfCnpj: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: "cpfCnpjUniqueIndex",
    },
    flagAtivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'proprietario',
    sequelize: sequelize,
    updatedAt: 'datAtualizacao',
    createdAt: 'datCadastro',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate: (data, options) => {
            data.cpfCnpj = data.cpfCnpj?.replace('.', '').replace('-', '').replace('/', '');
        },
    }
});

Proprietario.sync({ force: false }).then(() => {
    Proprietario.belongsTo(Usuario, {
        foreignKey: 'codUsuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    
    let data = [
        {
            codProprietario: 1,
            codUsuario: 1,
            nome: 'Proprietario 1 Teste',
            razaoSocial: 'Proprietario 1 S/A',
            nomeFantasia: 'Proprietario 1 Nome Fantasia',
            cpfCnpj: '00000000000',
            flagAtivo: true
        }
    ];

    Proprietario.bulkCreate(data, { individualHooks: true, ignoreDuplicates: true, validate: true }).then(() => {
        console.log(`'proprietario' criado`);
    }).catch((e) => {
        console.log(`proprietario já foi criado`);
    });

    console.log(`tabela 'proprietario' criada`);
});
