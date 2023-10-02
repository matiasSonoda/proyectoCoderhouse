import local from "passport-local" //estrategia
import passport from "passport" //maneja las estrategias
import { createHash, validatePassword } from "../utils/bcrypt.js"
import GithubStrategy from "passport-github2"
import usersModel from "../models/users.model.js"
import jwt from "passport-jwt"
import { application, json } from "express"
//Defino la estrategia
const localStrategy= local.Strategy
const JWTStrategy= jwt.Strategy
const ExtractJWT= jwt.ExtractJwt // extractor de los header de la consulta


const initializePassport=()=>{

    const cookieExtractor = req =>{
        console.log(req.cookies)
        //{} no hay cookies != no existe mi cookie
        //si existen cookies, consulte por mi cookie y  sino asigno {}
        const token= req.cookies ? req.cookies.jwtCookie : {}
        console.log(token)
        return token

    }

    passport.use("jwt", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),//consulto el token de las cookies
        secretOrKey: process.env.JWT_SECRET

    },async (jwt_payload,done)=>{
        try{
            return done(null, jwt_payload)//retorno el contenido del token
        }
        catch(error){
            return done(error)
        }
    }))


    passport.use("register", new localStrategy({ passReqToCallback:true,usernameField:"email" }, async(req,username,password,
        done)=>{
        //Defino como voy a registrar un usuario
        const {first_name, last_name, email, age}= req.body
        try{
            const user = await usersModel.findOne({email:email})
            if (user){
                //Done es como un return de un callback
                return done(null,false)
            }
            const passwordHash = createHash(password)
            const userCreated =  await usersModel.create({
                first_name:first_name,
                last_name:last_name,
                email:email,
                age:age,
                password: passwordHash,
            })
            console.log(userCreated)
            return done(null, userCreated)
        }
        catch(error){
            return done(error)
        }
    }))
    //done es un res.status()
    passport.use("github", new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
        }, async(accessToken, refreshToken, profile, done)=>{
        try{
        console.log(accessToken)
        console.log(refreshToken)
        const user = await usersModel.findOne({email:profile._json.email})
        if (!user){
            const   userCreated = await usersModel.create({
                first_name: profile._json.last_name,
                last_name:" ",
                email: profile._json.email,
                age: 18, // edad por defecto
                password:"password"
            })
            done(null, userCreated)
        }else{
            done(null,false)
        }}
        catch(error){

        }

    }))
    //Inicializar la sesion del usuario
    passport.serializeUser((user, done)=>{
        done(null,user.user._id)
    })
    //Eliminar la sesion del usuario
    passport.deserializeUser(async(id,done)=>{
        const user= await usersModel.findById(id)
        done(null,user)
    })
    passport.use("login", new localStrategy({usernameField:"email"},async(username, password, done)=>{
        try{
            const user = await usersModel.findOne({email: username})
            if (!user){
                return done(null, false)
            }
            if(validatePassword(password, user.password)){
                return done(null, user)//Usuario y contraseña valida
            }
            return done(null, false)//contraseña no valida
        }
        catch(error){
            return done(error)
        }
    }))
}
export default initializePassport


