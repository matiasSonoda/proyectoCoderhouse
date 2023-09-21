import { Router } from "express";
import usersModel from "../models/users.model.js";

const sessionsRouter= Router()


sessionsRouter.get("/login",async (req,res)=>{
    res.render("login")
})
sessionsRouter.post("/login", async(req,res)=>{
    const {email, password}=req.body
    try{
        if (email === "adminCoder@coder.com" && password==="adminCod3r123")
            res.redirect("/static/realTimeProducts")
        if(req.session.login){
            res.status(200).send({resultado: "Login ya existente"})
        }
        const user= await usersModel.findOne({email:email})
        if (user){
            if(user.password === password)
            {
                req.session.login=true
                res.redirect('/api/products');
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

export default sessionsRouter