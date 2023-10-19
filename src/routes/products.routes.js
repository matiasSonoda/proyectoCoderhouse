// Importaciones
import { Router } from "express";
import productModel from "../models/products.model.js";
import { passportError, authorization } from "../utils/messageErrors.js"
import { getProduct, getProducts, postProduct,putProduct,deleteProduct } from "../controller/products.controller.js";

// Creación del router
const productRouter = Router();

// Ruta para obtener todos los productos
productRouter.get("/", getProducts);

// Ruta para obtener un producto por ID
productRouter.get("/:id", getProduct);

// Ruta para crear un producto
productRouter.post("/",passportError("jwt"), authorization("admin"), postProduct);

// Ruta para actualizar un producto
productRouter.put("/:id",putProduct);

// Ruta para eliminar un producto
productRouter.delete("/:id", deleteProduct);

export default productRouter;