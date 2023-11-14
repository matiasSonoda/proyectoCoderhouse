export const postRegisterUser = async(req,res)=>{
    try{
        return res.status(200).send({mensaje: `Usuario creado`})
    }catch(error){
            logger.error(`[Error] postRegisterUser ${error.message} - Date ${new Date().toLocaleString()}`)
            res.status(500).send({mensaje:`error al crear usuario: ${error}`})
    }
}