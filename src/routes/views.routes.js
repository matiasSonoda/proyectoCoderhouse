import { Router } from "express";
import productModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";
import sessionsRouter from "./sessions.routes.js";
import cartRoutes from "./carts.routes.js";


const viewsRouter = Router()

viewsRouter.get("/realtimeproducts", async(req,res)=>{
  const products = await productModel.find().lean()
    res.render("realTimeProducts",{
        rutaCSS:"realTimeProducts",
        rutaJS:"realTimeProducts",
        products,
    })
})

viewsRouter.get("/home", async(req,res)=>{
    const products = await productModel.find().lean()
    const info= req.query.info
    res.render("home",{
        rutaCSS:"home",
        rutaJS:"home",
        products,
        info,
    })
})

  export default viewsRouter