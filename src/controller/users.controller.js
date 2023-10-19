export const postRegisterUser = async(req,res)=>{
    try{
        return res.status(200).send({mensaje: `Usuario creado`})
    }catch(error){
            res.status(500).send({mensaje:`error al crear usuario: ${error}`})
    }
}