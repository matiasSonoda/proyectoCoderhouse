import "dotenv/config"
import jwt from "jsonwebtoken"

export const generateToken=(user)=>{    
    /*
        1° parametro: objeto asociado al token
        2° parametro: clave privada el cifrado
        3° parametro: tiempo de expiracion
    */
    const token= jwt.sign({user},"coderhouse123",{expiresIn:"12h"})
    return token
}

//console.log(generateToken({"_id":"651b4e08b66aec9d12b8c7f1","first_name":"matias","last_name":"sonoda","email":"matias@matias.com","age":{"$numberInt":"27"},"password":"$2b$15$DWfzkYadQkbW5WiUR9R6uuN9Bl5FLkHlqzgpY9CQqrsatI7GK4nRO"}))

export const  authToken=(req,res,next)=>{
    //consulto el header
    const authHeader= req.headers.Authorization  //Consulto si existe el token
    if (!authHeader){
        return res.status(401).send({error:"Usuario no autenticado"})
    }

    const token = authHeader.split(" ")[1]//Separo en dos mi token y me quedo con la parte valida

    jwt.sign(token, process.env.JWT_SECRET, (error,credentials)=>{
        if(error){
            return res.status(403).send({error:"error usuario no autorizado"})
        }
        //decifro el token
        req.user=credentials.user
        next()
    })
}