import { Usuario } from "../models/Usuario";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { environments } from "../config/environments";

const jwtSecret: any = environments.jwt_secret;

const params = {
    passReqToCallback: true,
    secretOrKey: jwtSecret, //importa a chave secreta da aplicação 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Captura o token de requisição
};

const strategy = new Strategy(params, (req: any, payload: any, done: any) => {
    const bearer = req.headers.authorization.split(' ')[1];//recuperando bearer 
    if (payload.codUsuario) {
        Usuario.findOne({
            where: {
                codUsuario: payload.codUsuario,
                flagAtivo: true,
                token: bearer
            }
        }).then(user => {
            if (user) {
                return done(null, user);
            }

            return done(null, false);
        }).catch(error => done(error, false));
    } else {
        return done(null, false);
    }
});

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.use(strategy);

const authMiddleware = {
    initialize: () => {
        return passport.initialize();
    },
    authenticate: () => {
        const authenticated = passport.authenticate('jwt', jwtSecret);
        return authenticated;
    }
};

export default authMiddleware;
