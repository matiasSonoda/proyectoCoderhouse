// Importaciones
import { Router } from "express";
import productModel from "../models/products.model.js";

// Creación del router
const viewsRouter = Router();

// Ruta para mostrar los productos en tiempo real
viewsRouter.get("/realtimeproducts", async (req, res) => {
    const products = await productModel.find().lean();
    res.render("realTimeProducts", {
        rutaCSS: "realTimeProducts",
        rutaJS: "realTimeProducts",
        products,
    });
});

// Ruta para mostrar la página de inicio
viewsRouter.get("/home", async (req, res) => {
    const products = await productModel.find().lean();
    const info = req.query.info;
    res.render("home", {
        rutaCSS: "home",
        rutaJS: "home",
        products,
        info,
    });
});

export default viewsRouter;