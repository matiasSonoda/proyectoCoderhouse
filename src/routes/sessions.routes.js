import { Router } from "express";
import sessionsModel from "../models/sessions.model.js";

const sessionsRouter= Router()

sessionsRouter.get("/login", async(req,res)=>{
    const {email, password}=req.body
    try{
        if(req.session.login){
            res.status(200).send({resultado: "Login ya existente", message: user})
        }
        const user= await sessionsModel.find({email:email})
        if (user){
            if(user.password === password)
            {
                req.session.login=true
                res.status(200).send({resultado: "Login valido", message: user})
            }
            else
            {
                res.status(401).send({resultado: "Contraseña no valida", message: user})
            }
        return res.send("usuario logueado")}
        else{
            res.status(404).send({resultado: "not found", message: user})
        }
    }
    catch(error){
        res.status(400).send(error)
    }
})
sessionsRouter.get("/logout",async(req,res)=>{
    req.session.destroy((error)=>{

    })
})

async  function  auth(req,res,next){
    try{
    if(req.session.email==="admin@admin.com"&& req.session.password==="admin"){
        return next()
    }
    return res.send("No tenes accesos a este contenido")}
    catch(error){
        console.log(error)
    }
}
sessionsRouter.get("/admin",auth,  async(req,res)=>{
    res.send("sos admin")
})

sessionsRouter.post("register")

export default sessionsRouter