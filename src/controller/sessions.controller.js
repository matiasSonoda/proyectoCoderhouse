import { generateToken } from "../utils/jwt.js"

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
        res.redirect("/api/products")

   }
   catch(error){
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