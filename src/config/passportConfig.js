import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { usersDao } from "../dao/index.js";
import githubStrategy from "passport-github2";
import { config } from "./config.js";

export const initializePassport = ()=>{
    passport.use("signupStrategy", new LocalStrategy(
        {
            //username, password
            usernameField:"email",
            passReqToCallback:true,
        },
        async (req, username, password, done)=>{
            try {
                const {first_name} = req.body;
                //verificar si el usuario ya se registro
                const user = await usersDao.getByEmail(username);
                if(user){
                    return done(null, false)
                }
                //hace una validacion desde la ultima letra hacia atras hasta el final para ver que tengan esos caracteres
                let role = "user";
                if(username.endsWith("@coder123.com")){
                    role="admin";
                }
                const newUser = {
                    first_name:first_name,
                    email: username,
                    password:createHash(password),
                    role:role
                }
                const userCreated = await usersDao.save(newUser);
                return done(null,userCreated)//En este punto passport completa el proceso de manera satisfactoria
            } catch (error) {
                return done(error)
            }
        }
    ));
    
    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField:"email"
        },
        async(username, password, done)=>{
            try {
                //verificar si el usuario ya se registro
                const user = await usersDao.getByEmail(username);
                if(!user){
                    return done(null, false)
                }
                //si el usuario existe, validar la contraseña
                if(isValidPassword(user,password)){
                    return done(null,user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("githubLoginStrategy", new githubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clienteSecret,
            callbackUrl: config.github.callbackUrl
        },
        async(accesstoken,refreshToken,profile,done)=>{
            try {
                console.log("profile", profile);
                //verificar si ya el usuario esta registrado en nuestra plataforma
                const user = await usersDao.getByEmail(profile.username);
                if(!user){
                    const newUser = {
                        first_name: '',
                        email: profile.username,
                        password: createHash(profile.id)
                    };
                    const userCreated = await usersDao.save(newUser);
                    return done(null,userCreated)//En este punto passport completa el proceso de manera
                } else {
                    return done(null,user)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    //serializacion y deserializacion
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await usersDao.getById(id);
        done(null,user) //req.user --->sesions req.sessions.user
    });
}