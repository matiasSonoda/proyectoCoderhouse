import local from "passport-local" //estrategia
import passport from "passport" //maneja las estrategias
import { createHash, validatePassword } from "../utils/bcrypt.js"
import GithubStrategy from "passport-github2"
import usersModel from "../models/users.model.js"
//Defino la estrategia
const localStrategy= local.Strategy
const initializePassport=()=>{
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
        clienteSecret: process.env.CLIENT_SECRET,
        callBackURL: process.env.CALLBACK_URL

    }, async(accessToken, refreshToken, profile, done)=>{
        try{
        console.log(accessToken)
        console.log(refreshToken)
        const user = await usersModel.findOne(profile._json.email)
        if (user){
                done(null,false)
        }else{
                const   userCreated = await usersModel.create({
                    first_name: profile._json.last_name,
                    last_name:"",
                    email: profile._json.email,
                    age: 18, // edad por defecto
                    password:"password"
                })
                done(null, userCreated)
        }}
        catch(error){

        }

    }))
    //Inicializar la sesion del usuario
    passport.serializeUser((user, done)=>{
        done(null,user._id)
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


