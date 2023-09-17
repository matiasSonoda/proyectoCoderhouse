import express from "express";
import session from "express-session";
import "dotenv/config"
import productRouter from "./routes/products.routes.js";
import mongoose from "mongoose";
import cartRoutes from "./routes/carts.routes.js";
import cartsModel from "./models/carts.model.js";
import cookieParser from "cookie-parser";

const app= express()
const PORT= 4000;

//BDD
mongoose.connect(process.env.MONGO_URL)
.then(async ()=> {
console.log("BDD conectada")
//await cartsModel.create({})
//const cart = await cartsModel.findOne({_id:"64fbe6651e9b3f2c80598459"}).populate("products.id_prod")
//console.log(JSON.stringify(cart))
}
)

.catch((error)=>console.log("error de conexion mongoDb Atlas: " ,error))

//middlewares
app.use(express.json())
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
//routes
app.use("/api/products", productRouter)
app.use("/api/carts", cartRoutes)
//SESSION
app.get("/session",(req, res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Has entrado ${req.session.counter} veces`)
    }else{
        req.session.counter=1
        res.send("Hola, por primera vez")
    }
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