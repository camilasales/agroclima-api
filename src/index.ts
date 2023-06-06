import app from "./config/app";
import { environments } from './config/environments';

const port = environments.api_port ? Number(environments.api_port) : 3333;
app.listen(port, () => console.log(`[${environments.env}] ${environments.app_name} ${environments.api_version} - funcionando na porta ${port}`));

console.log(`Worker iniciou.`);