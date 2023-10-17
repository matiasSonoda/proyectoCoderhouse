export const postLoginSession = async(req,res)=>{
    try{
        if(!req.user){
            res.status(401).send({mensaje: `invalidate user`})
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
        res.status(200).send({payload: req.user})
   }
   catch(error){
        res.status(500).send({mensaje:`error al iniciar sesion: ${error}`})
   }
}

export const postLogoutSession = async(req,res)=>{
    req.session.destroy((error) => console.log(error));
    res.clearCookie("jwtCookie")
    res.redirect("/api/sessions/login");
}

export const postJwtLoginSession = async(req,res)=>{
    res.status(200).send({ mensaje: req.user})
    console.log(req.user.user)
    req.session.user={
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email
    }
}

export const postGithubRegisterSession = async(req,res)=>{
    res.status(200).send({mensaje:"Usuario creado"})
}

export const postGithubLoginSession = async(req,res)=>{
    req.session.user= req.user
    res.status(200).send({mensaje:"session creada"})
}