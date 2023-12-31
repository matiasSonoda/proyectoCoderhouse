import cartsModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";
import ticketModel from "../models/tickets.model.js";
import { v4 as uuidv4 } from "uuid";
import { logger, loggerError } from "../utils/logger.js";
export const getAllCarts = async(req,res)=>{
    try {
        const carts = await cartsModel.find();
        res.status(200).send(carts);
      } catch (error) {
        loggerError(error)
        res.status(400).send({ error: `error al consultar los carritos: ${error}` });
      }
}

export const getSpecificCart = async(req,res)=>{
    const { cid } = req.params;
  try {
    const carts = await cartsModel.findById(cid).populate("products.id_prod");
    if (carts) {
       // Calcula el precio total
       let totalPrice = 0;
       for (let product of carts.products) {
           totalPrice += product.id_prod.price * product.quantity;
       }
      res.render("cart",{
        rutaCSS: "cart",
        carts: carts,
        idCart: cid,
        totalPrice: totalPrice
      })
    } else {
      res.status(404).send(`No se encontro el carrito ${carts}`);
    }
  } catch (error) {
    loggerError(error);
    res.status(400).send({ error: `error al consultar carrito: ${error}` });
  }
}

export const postProductInCart = async(req,res)=>{
    const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartsModel.findById(cid);
    if (cart) {
      const product = cart.products.find(p => p.id_prod === pid)
      if (product){
        product.quantity += quantity
      }
      else{
      cart.products.push({ id_prod: pid, quantity: quantity });
      }
      const respuesta = await cartsModel.findByIdAndUpdate(cid, cart);
      res.status(200).send({ respuesta: "OK", mensaje: respuesta });
    }
  } catch (error) {
    loggerError(error);
    res.status(400).send({error: error.message});
  }
}

export const deleteSpecificCart = async(req,res)=>{
    let { cid } = req.params;
  try {
    const cart = await cartsModel.findById(cid);
    if (cart) {
      cart.products = [];
      cart.save();
      res.status(200).send(`Se elimino correctamente ${cid}`);
    } else {
      res.status(404).send(`No se encontro el carrito ${cid}`);
    }
  } catch (error) {
    loggerError(error);
    res.status(400).send({ error: `error al consultar carrito: ${error}` });
  }
}

export const deleteProductOfCart = async(req,res)=>{
    let { pid, cid } = req.params;
  const cart = await cartsModel.findById(cid);
  try {
    if (cart) {
      let prodIndex = await cart.products.findIndex(
        (product) => product.id_prod.toString() === pid
      );
      if (prodIndex > -1) {
        const product = cart.products[prodIndex];
        cart.products.splice(prodIndex, 1);
        cart.save();
        res.status(200).send(`Se elimino correctamente el producto ${product}`);
      } else {
        res.status(404).send(`No se encontro el producto ${pid}`);
      }
    } else {
      res.status(404).send(`No se encontro el carrito ${cid}`);
    }
  } catch (error) {
    loggerError(error);
    res.status(400).send("error", error);
  }
}

export const putSpecificCart = async(req,res)=>{
    const { cid } = req.params;
    const productsArray = req.body;
    const cart = await cartsModel.findById(cid);
    try {
      if (cart) {
        //Product corresponde a cada producto que envio en el array productsArray
        productsArray.forEach((product) => {
          //Con el metodo find() puedo buscar el producto dentro del carrito que coindice con el id que mando dentro de productsArray
          const prod = cart.products.find(
            (cartProd) => cartProd.id_prod == product.id_prod
          );
          if (prod) {
            //si existe le aumento la cantidad
            prod.quantity += product.quantity;
          } else {
            // Si no existe pusheo product
            cart.products.push(product);
          }
        });
        await cart.save();
        res.status(200).send(`Carrito actualizado: ${cid}`);
      } else {
        res.status(404).send(`No se encontró el carrito: ${cid}`);
      }
    } catch (error) {
      loggerError(error)
      res.status(400).send(`Error: ${error}`);
    }
}

export const putQuantityProductOfCart = async(req,res)=>{
    let { quantity } = req.body;
  const { cid, pid } = req.params;
  const cart = await cartsModel.findById(cid);
  try {

    let prod = await cart.products.find(
      (product) => product.id_prod.toString() === pid
    );
    if (prod) {
      prod.quantity += quantity
    }
    else{
        res.status(404).send(`Producto no encontrado: ${pid}`)
    }
    cart.save();
    res.status(200).send(`Se actualizo el producto: ${pid}`);
  } catch (error) {
    loggerError(error);
    res.status(400).send(`Error: ${error}`);
  }
}

export const postBuyCart = async (req, res) => {
    const {cid} = req.params
    const {email} = req.user.user
    const cartID = req.user.user.cart
    try{
    const cart = await cartsModel.findById(cid)
    if (cart._id.toString() === cartID)
    {
        let message = "Compra completada"
        let allOutOfStock = true
        let amount = 0
        for ( let i = 0; i < cart.products.length; i++){
          const product = await productModel.findById(cart.products[i].id_prod)
          if (product.stock > cart.products[i].quantity ){
            const update = product.stock - cart.products[i].quantity
            allOutOfStock = false
            product.stock = update
            for ( let j= 0; j < cart.products[i].quantity; j++){
              amount += product.price
            }
            await product.save()
        }
          else{
             message+= `\nNo hay stock suficiente para ${cart.products[i].id_prod}`
             cart.products.splice(i,1)
          }
      }
      cart.products = []
      await cart.save()
      if(allOutOfStock){
       return res.status(400).send("No hay stock de ningun producto. No se pudo completar la compra")
      }
      cart.save()
      const ticket = await ticketModel.create({code:uuidv4(), purchase_dateTime:Date.now(),purchaser:email,amount:amount})
      if (message){
          return res.status(200).send({message, ticket})
        }
    else {
      return res.status(404).send('Carrito no encontrado');
    }
  }
}
catch(error){
  loggerError(error);
  res.status(400).send(`Error: ${error}`);
}
}

