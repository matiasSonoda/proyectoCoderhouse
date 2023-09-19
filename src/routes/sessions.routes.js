import { Router } from "express";
import sessionsModel from "../models/sessions.model.js";

const sessionsRouter= Router()

sessionsRouter.get("/login", async(req,res)=>{
    const {email, passowrd}=req.body
    try{
    if(email==="admin@admin.com" && passowrd==="admin")
    {
        req.session.email=email
        req.session.passowrd=passowrd
        return res.status(200).send("usuario logueado")
    }
    return res.status(400).send("Login fallido")
    }
    catch(error){
        res.status(400).send(error)
    }
})

sessionsRouter.post("register")

export default sessionsRouter