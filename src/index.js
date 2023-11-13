import express, { urlencoded } from "express";
import session from "express-session";
import "dotenv/config" //Permite utilizar variables de entorno
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import * as path from "path"
import passport from "passport";
import initializePassport from "./config/passport.js";
import router from "./routes/index.routes.js";
import errorHandler from "./middlewares/errors/index.js"
import { addLogger } from "./utils/logger.js";
const app= express()
const PORT= 4000;
//app.use(addLogger);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB conectada")
})
.catch((error)=>{
    console.error(error)
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
app.use(addLogger);
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser(process.env.JWT_SECRET))
app.use(session({
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        ttl:90//segundos
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true    
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
//routes

app.use("/", router)
app.use(errorHandler)
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