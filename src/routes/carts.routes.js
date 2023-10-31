import { Router } from "express";
import { Schema } from "mongoose";
import cartsModel from "../models/carts.model.js";
import { getAllCarts, getSpecificCart, postProductInCart, putSpecificCart, putQuantityProductOfCart, deleteProductOfCart, deleteSpecificCart, postBuyCart } from "../controller/carts.controller.js";
import passport from "passport";
import { authorization, passportError } from "../utils/messageErrors.js";
const cartRoutes = Router();


cartRoutes.get("/", getAllCarts);

cartRoutes.get("/:cid", getSpecificCart);

cartRoutes.post("/:cid/products/:pid",passportError("jwt"),authorization("user"), postProductInCart);

cartRoutes.delete("/:cid", deleteSpecificCart);

cartRoutes.delete("/:cid/products/:pid",deleteProductOfCart);

cartRoutes.put("/:cid",putSpecificCart);

cartRoutes.post("/:cid/purchase",passportError("jwt"), authorization("user"),postBuyCart);

cartRoutes.put("/:cid/products/:pid",putQuantityProductOfCart);

export default cartRoutes;
