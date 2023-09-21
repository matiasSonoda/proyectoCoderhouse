import { Router } from "express";
import productModel from "../models/products.model.js";
const productRouter= Router();

/*productRouter.get("/", async(req, res)=>{
    const {limit, page, sort, category} = req.query
    try{
        let filter = {};
        if (category) {
            filter.category = category;
        }
        const prods = await productModel.paginate(filter,{limit : limit || 10, page:page, sort: {price: sort} } )
        res.status(200).send({resultado: "Ok", message: prods})
    }
    catch(error){
        res.status(400).send({error:`error al consultar productos: ${error}`})
    }
})
*/
productRouter.get("/", async(req, res) => {
    const {limit, page, sort, category} = req.query
    try {
      let filter = {};
        if (category) {
            filter.category = category;}
            const options={
                limit:parseInt(limit) || 10,
                page:parseInt(page),
                sort: {price:sort|| "asc"} 
            }
            const products = await productModel.paginate(filter,options)
            res.render("realTimeProducts",{products:products.docs})
      res.render('realTimeProducts', { products }); // Renderiza la vista 'products' con los productos
    } catch (error) {
      res.status(500).send({ error: `Error al obtener productos: ${error}` });
    }
  });

productRouter.get("/:id", async(req, res)=>{
    const {id} = req.params
    try{
        const prod = await productModel.findById(id)
        if (prod){
            res.status(200).send({resultado: "Ok", message: prod})
        }
        else{
            res.status(404).send({resultado: "not found", message: prod})
        }
    }
    catch(error){
             res.status(400).send({error:`error al consultar productos: ${error}`})
    }
})

productRouter.post("/", async(req, res)=>{
    const {title, description, stock, code, price, category} = req.body
    try{
        const respuesta = await productModel.create({title, description, stock, code, price, category})
            res.status(200).send({resultado: "Ok", message: respuesta})
    }
    catch(error){
             res.status(400).send({error:`error al crear producto: ${error}`})
    }
})

productRouter.put("/:id", async(req, res)=>{
    const {id} = req.params
    const {title, description, stock, code, price, category,status} = req.body
    try{
        const respuesta = await productModel.findByIdAndUpdate(id,{title, description, stock, code, price, category, status})
        if (respuesta){
            res.status(200).send({resultado: "Ok", message: respuesta})
        }
        else{
            res.status(404).send({resultado: "not found", message: respuesta})
        }
    }
    catch(error){
             res.status(400).send({error:`error al actualizar producto: ${error}`})
    }
})

productRouter.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try{
        const respuesta = await productModel.findByIdAndDelete(id)
        if (respuesta){
            res.status(200).send({resultado: "Ok", message: respuesta})
        }
        else{
            res.status(404).send({resultado: "not found", message: respuesta})
        }
    }
    catch(error){
             res.status(400).send({error:`error al borrar producto: ${error}`})
    }
})

export default productRouter