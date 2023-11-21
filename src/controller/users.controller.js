import { loggerError } from "../utils/logger.js"

export const postRegisterUser = async(req,res)=>{
    try{
        return res.status(200).send({mensaje: `Usuario creado`})
    }catch(error){
            loggerError(error)
            res.status(500).send({mensaje:`error al crear usuario: ${error}`})
    }
}