import { Router } from "express";
import { Schema } from "mongoose";
import cartsModel from "../models/carts.model.js";
import { getAllCarts, getSpecificCart, postProductInCart, putSpecificCart, putQuantityProductOfCart, deleteProductOfCart, deleteSpecificCart, postBuyCart } from "../controller/carts.controller.js";
const cartRoutes = Router();


cartRoutes.get("/", getAllCarts);

cartRoutes.get("/:cid", getSpecificCart);

cartRoutes.post("/:cid/products/:pid", postProductInCart);

cartRoutes.delete("/:cid", deleteSpecificCart);

cartRoutes.delete("/:cid/products/:pid",deleteProductOfCart);

cartRoutes.put("/:cid",putSpecificCart);

cartRoutes.post("/:cid/purchase", postBuyCart );

cartRoutes.put("/:cid/products/:pid", async (req, res) => {putQuantityProductOfCart});

export default cartRoutes;
