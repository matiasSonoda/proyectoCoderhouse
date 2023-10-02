import jwt from "jsonwebtoken"

export const generateToken=(user)=>{    
    /*
        1° parametro: objeto asociado al token
        2° parametro: clave privada el cifrado
        3° parametro: tiempo de expiracion
    */
    const token= jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"12h"})
    return token
}

export const  authToken=(req,res,next)=>{
    //consulto el header
    const authHeader= req.headers.Authorization //Consulto si existe el token
    if (!authHeader){
        return res.status(401).send({error:"Usuario no autenticado"})
    }

    const token = authHeader.split("  ")[1]//Separo en dos mi token y me quedo con la parte valida

    jwt.sign(token, process.env.JWT_SECRET, (error,credentials)=>{
        if(error){
            return res.status(403).send({error:"error usuario no autorizado"})
        }
        //decifro el token
        req.user=credentials.user
        next()
    })
}