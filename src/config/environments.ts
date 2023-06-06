import dotenv from 'dotenv';
import * as process
    from "process";

dotenv.config();

export const environments = {
    env: process.env.ENV,
    url: process.env.APP_URL,
    app_name: process.env.APP_NAME,
    api_port: process.env.API_PORT,
    api_version: process.env.API_VERSION,
    db_dialect: process.env.DB_DIALECT,
    db_name: process.env.DB_NAME,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    jwt_secret: process.env.JWT_SECRET,
};
