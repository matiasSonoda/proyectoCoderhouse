import { Router } from "express";
import usersModel from "../models/users.model.js";

const usersRouter = Router()

usersRouter.get("/signin",async(req,res)=>{
    res.render("signin")
  })
usersRouter.post("/signin",async(req,res)=>{
    const {first_name, last_name, email, password, age}= req.body
    try{
        const newUser = await usersModel.create({first_name,last_name,email,age,password})
        await newUser.save()
        res.redirect('/static/login');
    }
    catch(error){
        res.status(400).send(error)
    }
})
export default usersRouter