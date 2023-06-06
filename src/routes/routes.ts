import AuthController from '../controllers/AuthController';
import { IndexController } from '../controllers/IndexController';
import UsuarioController from '../controllers/UsuarioController';
import ProprietarioController from '../controllers/ProprietarioController';

import UsuarioValidator from "../validators/UsuarioValidator";
import ProprietarioValidator from "../validators/ProprietarioValidator";

import authMiddleware from '../middlewares/auth.middleware';

export class Routes {
    constructor() {
    }

    public routes(app: any): void {

        //Index
        const indexController = new IndexController()
        app.get('/', indexController.get);

        //Auth
        const authController = new AuthController();
        app.post("/auth/login", authController.login);
        
        //Usuário
        const usuarioController = new UsuarioController();
        const usuarioValidator = new UsuarioValidator();
        app.post("/usuario", [usuarioValidator.validarUsuarioCadastrar], usuarioController.cadastrar);

        app.use(authMiddleware.authenticate());
        
        app.get("/usuario/:codUsuario", usuarioController.ver);
        app.put("/usuario/:codUsuario", [usuarioValidator.validarUsuarioAlterar], usuarioController.alterar);

        //Proprietario
        const proprietarioController = new ProprietarioController();
        const proprietarioValidator = new ProprietarioValidator();
        app.post("/proprietario", [proprietarioValidator.validarProprietarioCadastrar], proprietarioController.cadastrar);
        app.get("/proprietario/:codProprietario", proprietarioController.ver);
    }
}
