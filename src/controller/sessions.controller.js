import { generateToken } from "../utils/jwt.js"
import customError from "../service/error/customError.js"
import EErrors from "../service/error/enums.js"
import { LoginUserErrorInfo } from "../service/error/info.js"
import { logger } from "../utils/logger.js"

export const postLoginSession = async(req,res)=>{
    try{
        if(!req.user){
            req.Logger.warn("Usuario no registrado IF")
            customError.createError({
                name: "User login error",
                cause:LoginUserErrorInfo({email, password }),
                message:"Error trying to login user",
                code:EErrors.INVALID_TYPES_ERROR
            })
            //res.status(401).send({mensaje: `invalidate user`})
        }
        req.session.user={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        const token = generateToken(req.user)
        res.cookie("jwtCookie", token, {
            maxAge: 43200000
        })
        res.redirect("/api/products")

   }
   catch(error){
        logger.error(`[Error] postLoginSession ${error.message} - Date ${new Date().toLocaleString()}`)
        res.status(500).send({mensaje:`error al iniciar sesion: ${error}`})
   }
}

export const postLogoutSession = async(req,res)=>{
    await req.session.destroy((error) =>{
        if(error)
        {console.log(error)
        res.status(500).send({error:"Fallo en cerrar session"})}});
    res.clearCookie("jwtCookie")
    res.redirect("/api/sessions/login");
}