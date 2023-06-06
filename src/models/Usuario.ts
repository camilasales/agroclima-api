import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Proprietario } from "./Proprietario";
import bcrypt from "bcrypt";


export class Usuario extends Model {
    public codUsuario?: bigint;
    public nome?: string;
    public email?: string;
    public telefone?: string;
    public senha?: string;
    public token?: string;
    public flagAtivo?: number;
    public readonly datCadastro?: Date;
    public readonly datAtualizacao?: Date;
}

export interface UsuarioInterface {
    codUsuario?: bigint;
    nome?: string;
    email?: string;
    telefone?: string;
    senha?: string;
    token?: string;
    flagAtivo?: number;
}

Usuario.init({
    codUsuario: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "emailUniqueIndex",
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    senha: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    flagAtivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'usuario',
    sequelize: sequelize,
    paranoid: true,
    updatedAt: 'datAtualizacao',
    createdAt: 'datCadastro',
    freezeTableName: true,
    timestamps: true,
    hooks: {
        beforeValidate: (data, options) => {
            data.telefone = data.telefone?.replace('.', '').replace('-', '').replace('/', '');
        },
        beforeCreate: (data) => {
            if (data.senha) {
                data.senha = criptografarSenha(data.senha);
            }
        },
        beforeUpdate: (data) => {
            if (data.senha) {
                data.senha = criptografarSenha(data.senha);
            }
        }
    }
});

Usuario.sync({ force: false }).then(() => {
    Usuario.hasOne(Proprietario, { foreignKey: 'codUsuario' });

    Usuario.bulkCreate([
        {
            codUsuario: 1,
            nome: 'Usuario 1 Teste',
            email: 'usuario1@gmail.com',
            telefone: '11999999999',
            senha: 'S123456',
            flagAtivo: true
        }
    ], { individualHooks: true, ignoreDuplicates: true, validate: true }).then(() => {
        console.log(`usuario teste criada`);
    }).catch(() => {
        console.log(`usuario teste já foi criada`);
    });

    console.log(`tabela 'Usuario' criada`);

});

function criptografarSenha(senha: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(senha.toString(), salt);
}
