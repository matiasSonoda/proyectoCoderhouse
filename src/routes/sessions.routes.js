import { Router } from "express";
import sessionsModel from "../models/sessions.model.js";

const sessionsRouter= Router()

sessionsRouter.get("/login", async(req,res)=>{
    const {email, password}=req.body
    try{
        req.session.email=email
        req.session.password=password
        return res.send("usuario logueado")
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