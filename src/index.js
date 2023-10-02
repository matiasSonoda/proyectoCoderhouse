import express, { urlencoded } from "express";
import session from "express-session";
import "dotenv/config" //Permite utilizar variables de entorno
import productRouter from "./routes/products.routes.js";
import mongoose from "mongoose";
import cartRoutes from "./routes/carts.routes.js";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import sessionRouter from "./routes/sessions.routes.js"
import MongoStore from "connect-mongo";
import usersRouter from "./routes/users.routes.js";
import __dirname from "./utils.js";
import * as path from "path"
import viewsRouter from "./routes/views.routes.js";
import passport from "passport";
import initializePassport from "./config/passport.js";
const app= express()
const PORT= 4000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB conectada")
})
.catch((error)=>{
    console.log(error)
})
//Handlebars
app.engine("handlebars", engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set("view engine","handlebars")
app.set("views", path.resolve(__dirname+"/views"))

//Archivos estaticos

app.use( "/",express.static(__dirname+"/public"))
app.use(express.static('public'));

//middlewares
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(session({
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        ttl:90//segundos
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false    
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
//routes

app.use("/static", viewsRouter )
app.use("/api/products", productRouter)
app.use("/api/carts", cartRoutes)
app.use("/api/sessions", sessionRouter)
app.use("/api/users", usersRouter)

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