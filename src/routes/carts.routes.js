import { Router } from "express";
import { Schema } from "mongoose";
import cartsModel from "../models/carts.model.js";

const cartRoutes = Router();


cartRoutes.get("/", async (req, res) => {
  try {
    const carts = await cartsModel.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(400).send({ error: `error al consultar los carritos: ${error}` });
  }
});

cartRoutes.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const carts = await cartsModel.findById(cid).populate("products.id_prod");
    if (carts) {
      res.status(200).send(carts);
    } else {
      res.status(404).send(`No se encontro el carrito ${carts}`);
    }
  } catch (error) {
    res.status(400).send({ error: `error al consultar carrito: ${error}` });
  }
});
cartRoutes.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartsModel.findById(cid);
    if (cart) {
      cart.products.push({ id_prod: pid, quantity: quantity });
      const respuesta = await cartsModel.findByIdAndUpdate(cid, cart);
      res.status(200).send({ respuesta: "OK", mensaje: respuesta });
    }
  } catch (error) {
    res.status(400).send("Error: ", error);
  }
});

cartRoutes.delete("/:cid", async (req, res) => {
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
    res.status(400).send({ error: `error al consultar carrito: ${error}` });
  }
});
cartRoutes.delete("/:cid/products/:pid", async (req, res) => {
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
    res.status(400).send("error", error);
  }
});


cartRoutes.put("/:cid", async (req, res) => {
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
    res.status(400).send(`Error: ${error}`);
  }
});

//En este metodo en lugar de buscar el indice, tenes que hacer la misma validacion con cart.products.find() que hice en la otra ruta PUT. pero sin el forEach porque no envias un array, sino un objeto con quantity.
// Ahora, si el producto existe le agregas la cantidad que envias por req.body. Si no existe devolves error producto no encontrado

cartRoutes.put("/:cid/products/:pid", async (req, res) => {
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
    res.status(400).send(`Error: ${error}`);
  }
});

export default cartRoutes;
