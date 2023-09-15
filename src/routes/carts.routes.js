import {Router} from "express";
import { Schema } from "mongoose";
import cartsModel from "../models/carts.model.js";

const cartRoutes = Router();

cartRoutes.get("/:cid", async(req,res)=>{
    const {cid}= req.params
    try{
        const carts = await cartsModel.findById(cid).populate("products.id_prod")
        if(carts){
                res.status(200).send(carts)
        }
        else{
                res.status(404).send(`No se encontro el carrito ${carts}`)
        }
    }
    catch(error){
        res.status(400).send({error:`error al consultar carrito: ${error}`})
    }
})
cartRoutes.post("/:cid/products/:pid", async(req,res)=>{
    const {cid,pid}= req.params
    const {quantity}= req.body
   try{
        const cart = await cartsModel.findById(cid)
        if(cart){
            cart.products.push({id_prod:pid, quantity:quantity})
             const respuesta = await cartsModel.findByIdAndUpdate(cid, cart)
             res.status(200).send({respuesta: "OK", mensaje: respuesta})
        }
   }
   catch(error)
        {
            res.status(400).send("Error: ",error)
        }
})

cartRoutes.delete("/:cid", async(req,res)=>{
    let {cid}=req.params
    try{
        const cart = await cartsModel.findById(cid)
        if (cart){
            cart.products=[]
            cart.save()
            res.status(200).send(`Se elimino correctamente ${cid}`)
        }
        else{
            res.status(404).send(`No se encontro el carrito ${cid}`)
        }
    }
    catch(error){
        res.status(400).send({error:`error al consultar carrito: ${error}`})
    }
    }
)
cartRoutes.delete("/:cid/products/:pid", async(req,res)=>{
    let {pid, cid}= req.params
    const cart = await cartsModel.findById(cid)
    try{
        if (cart){
            let prodIndex = await cart.products.findIndex(product=>product.id_prod.toString()===pid)
            if(prodIndex>-1){
                const product = cart.products[prodIndex]
                cart.products.splice(prodIndex, 1)
                cart.save();
        res.status(200).send(`Se elimino correctamente el producto ${product}`)}
            else  {
                res.status(404).send(`No se encontro el producto ${pid}`)}}
        else{
            res.status(404).send(`No se encontro el carrito ${cid}`)
        }
    }
    catch(error){
        res.status(400).send("error", error)
    }
})

cartRoutes.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body;
    const cart = await cartsModel.findById(cid);
    try {
        if (cart) {
            productsArray.forEach(async (product) => {
                let prodIndex = cart.products.findIndex(p => p.id_prod.toString() === product.id_prod);
                if (prodIndex > -1) {
                    cart.products[prodIndex].quantity += product.quantity;
                    let prodIndex2 = productsArray.findIndex(p=>p.id_prod===cart.products.id_prod)
                    productsArray.splice(prodIndex2,1)
                    cart.products.push(productsArray)
                    await cart.save()
                    return
                } else {
                    const newProd = { quantity: product.quantity, id_prod: product.id_prod };
                    cart.products.push(newProd);
                    await cart.save();
                }
            });
            res.status(200).send(`Carrito actualizado: ${cid}`);
        } else {
            res.status(404).send(`No se encontró el carrito: ${cid}`);
        }
    } catch (error) {
        res.status(400).send(`Error: ${error}`);
    }
});

cartRoutes.put("/:cid/products/:pid", async(req,res)=>{
    let {quantity}= req.body
    const {cid, pid}=req.params
    const cart = await cartsModel.findById(cid)
    try{
        let prodIndex= await cart.products.findIndex(product=>product.id_prod.toString()===pid)
        if(prodIndex>-1){
            cart.products[prodIndex].quantity= quantity
        }
        cart.save()
        res.status(200).send(`Se actualizo el producto: ${pid}`)
    }
    catch(error){
        res.status(400).send(`Error: ${error}`)
    }
})

export default cartRoutes