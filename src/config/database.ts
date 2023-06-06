import { Log } from "../helpers/LogsHelper";
import { Sequelize } from "sequelize";
import { environments } from './environments';


const db = environments.db_name ? environments.db_name : '';
const username = environments.db_username ? environments.db_username : '';
const password = environments.db_password;

export const sequelize = new Sequelize(db, username, password, {
    dialect: 'postgres',
    host: environments.db_host,
    port: environments.db_port ? parseInt(environments.db_port) : 5432,
    dialectOptions: {
        useUTC: false,
    },
    timezone: '-03:00'
});

async function authenticate() {
    try {        
        let result = await sequelize.authenticate();

        console.log('Banco de dados funcionando: ', result);
    } catch (error: any) {
        Log('error', 'config/database.ts', 'authenticate', error.message);

        console.log('Banco de dados com problema: ', error);
    }
}

(async () => {
    await sequelize.sync({ alter: false });
})();

authenticate();
