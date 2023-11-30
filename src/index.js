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
import { addLogger, logger, loggerError } from "./utils/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app= express()
const PORT= 4000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    logger.info("DB conectada")
})
.catch((error)=>{
    loggerError(error)
    logger.error(error)
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
    resave: true,
    saveUninitialized: true    
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
//routes

app.use("/", addLogger,router)
app.use(errorHandler)
//Cookies

app.get("/setcookie",(req,res)=>{
    res.cookie("CookieCookie","Esto es el valor de una cookie",{maxAge:60000,signed:true}).send("Cookie creada")
})
app.get("/getcookie",(req,res)=>{
    res.send(req.signedCookies)
    res.send(req.cookies)
})

const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Documentacio ndel curso de Backend",
            description: "API Coderhouse Backend"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]

}

const specs = swaggerJSDoc(swaggerOptions)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//server

app.listen(PORT,()=>{
    logger.info(`server on ${PORT}`)
})