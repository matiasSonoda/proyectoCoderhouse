import express from "express";
import session from "express-session";
import "dotenv/config"
import productRouter from "./routes/products.routes.js";
import mongoose from "mongoose";
import cartRoutes from "./routes/carts.routes.js";
import cartsModel from "./models/carts.model.js";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import sessionRouter from "./routes/sessions.routes.js"
import MongoStore from "connect-mongo";
const app= express()
const PORT= 4000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB conectada")
})
.catch((error)=>{
    console.log(error)
})
/*//Hnadlebars
app.engine(".hbs", hbs({
    defaultLayout:"default",
    extname:".hbs"
}))
app.set("vie engine",".hbs")*/
//middlewares
app.use(express.json())
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        ttl:90//segundos
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//routes
app.use("/api/products", productRouter)
app.use("/api/carts", cartRoutes)
app.use("/api/sessions", sessionRouter)
//SESSION
/*app.get("/session",(req, res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Has entrado ${req.session.counter} veces`)
    }else{
        req.session.counter=1
        res.send("Hola, por primera vez")
    }
})*/
app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.send("Salio de la sesion")
    })
})
//Cookies
app.get("/setcookie",(req,res)=>{
    res.cookie("CookieCookie","Esto es el valor de una cookie",{maxAge:60000,signed:true}).send("Cookie creada")
})
app.get("/getcookie",(req,res)=>{
    res.send(req.signedCookies)
    res.send(req.cookies)
})
//server
app.listen(PORT,()=>{
    console.log(`server on ${PORT}`)
})