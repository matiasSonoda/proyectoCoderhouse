import { Router } from "express";
import usersModel from "../models/users.model.js";

const sessionsRouter= Router()


sessionsRouter.get("/login",async (req,res)=>{
    res.render("login",{
        rutaCSS:"login"
    })
})
sessionsRouter.post("/login", async(req,res)=>{
    const {email, password}=req.body
    try{
        if (email === "adminCoder@coder.com" && password==="adminCod3r123")
           {req.session.login=true
           return res.redirect("/static/realTimeProducts")}
        if(req.session.login){
           return res.status(200).send({resultado: "Login ya existente"})
        }
        const user= await usersModel.findOne({email:email})
        if (user){
            if(user.password === password)
            {
                req.session.login=true
               return res.redirect(`/api/products?info=${user.first_name}`);
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
sessionsRouter.post("/logout",async(req,res)=>{
    req.session.destroy((error)=>{
        console.log(error)
    })
    res.redirect("/api/sessions/login")
})
export default sessionsRouter