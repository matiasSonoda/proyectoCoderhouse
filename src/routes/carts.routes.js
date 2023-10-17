import { Router } from "express";
import { Schema } from "mongoose";
import cartsModel from "../models/carts.model.js";

const cartRoutes = Router();


cartRoutes.get("/", async (req, res) => {});

cartRoutes.get("/:cid", async (req, res) => {});

cartRoutes.post("/:cid/products/:pid", async (req, res) => {});

cartRoutes.delete("/:cid", async (req, res) => {});

cartRoutes.delete("/:cid/products/:pid", async (req, res) => {});


cartRoutes.put("/:cid", async (req, res) => {
});

//En este metodo en lugar de buscar el indice, tenes que hacer la misma validacion con cart.products.find()
//que hice en la otra ruta PUT. pero sin el forEach porque no envias un array, sino un objeto con quantity.
// Ahora, si el producto existe le agregas la cantidad que envias por req.body. Si no existe devolves error producto no encontrado

cartRoutes.put("/:cid/products/:pid", async (req, res) => {});

export default cartRoutes;
