export const postGithubRegisterSession = async(req,res)=>{
    res.status(200).send({mensaje:"Usuario creado"})
}

export const postGithubLoginSession = async(req,res)=>{
    req.session.user= req.user
    res.status(200).send({mensaje:"session creada"})
}