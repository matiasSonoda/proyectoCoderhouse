// Importaciones
import { Router } from "express";
import productModel from "../models/products.model.js";

// Creación del router
const productRouter = Router();

// Ruta para obtener todos los productos
productRouter.get("/", async(req, res) => {
    const { limit, page, sort, category, info } = req.query;
    const filter = category ? { category } : {};
    const options = {
        limit: parseInt(limit) || 10,
        page: parseInt(page),
        sort: { price: sort || "asc" }
    };

    try {
        const products = await productModel.paginate(filter, options);
        res.render("home", {
            rutaCSS: "home",
            rutaJS: "home",
            info,
            products: products.docs
        });
    } catch (error) {
        res.status(500).send({ error: `Error al obtener productos: ${error}` });
    }
});

// Ruta para obtener un producto por ID
productRouter.get("/:id", async(req, res) => {
    const { id } = req.params;

    try {
        const product = await productModel.findById(id);
        if (product) {
            res.status(200).send({ resultado: "Ok", message: product });
        } else {
            res.status(404).send({ resultado: "not found", message: product });
        }
    } catch (error) {
        res.status(400).send({ error: `Error al consultar productos: ${error}` });
    }
});

// Ruta para crear un producto
productRouter.post("/", async(req, res) => {
    const { title, description, stock, code, price, category } = req.body;

    try {
        const newProduct = await productModel.create({ title, description, stock, code, price, category });
        res.status(200).send({ resultado: "Ok", message: newProduct });
    } catch (error) {
        res.status(400).send({ error: `Error al crear producto: ${error}` });
    }
});

// Ruta para actualizar un producto
productRouter.put("/:id", async(req, res) => {
    const { id } = req.params;
    const { title, description, stock, code, price, category, status } = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, { title, description, stock, code, price, category, status });
        if (updatedProduct) {
            res.status(200).send({ resultado: "Ok", message: updatedProduct });
        } else {
            res.status(404).send({ resultado: "not found", message: updatedProduct });
        }
    } catch (error) {
        res.status(400).send({ error: `Error al actualizar producto: ${error}` });
    }
});

// Ruta para eliminar un producto
productRouter.delete("/:id", async(req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).send({ resultado: "Ok", message: deletedProduct });
        } else {
            res.status(404).send({ resultado: "not found", message: deletedProduct });
        }
    } catch (error) {
        res.status(400).send({ error:`Error al borrar producto: ${error}` });
    }
});

export default productRouter;