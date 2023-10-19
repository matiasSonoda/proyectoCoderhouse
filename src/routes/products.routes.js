// Importaciones
import { Router } from "express";
import productModel from "../models/products.model.js";
import { passportError, authorization } from "../utils/messageErrors.js"
import { getPorduct, getPorducts, postProduct,putProduct,deleteProduct } from "../controller/products.controller.js";

// Creación del router
const productRouter = Router();

// Ruta para obtener todos los productos
productRouter.get("/", async(req, res) => { getPorduct});

// Ruta para obtener un producto por ID
productRouter.get("/:id", async(req, res) => {getPorducts});

// Ruta para crear un producto
productRouter.post("/",passportError("jwt"), authorization("admin"), async(req, res) => {postProduct});

// Ruta para actualizar un producto
productRouter.put("/:id", async(req, res) => {putProduct});

// Ruta para eliminar un producto
productRouter.delete("/:id", async(req, res) => {deleteProduct});

export default productRouter;