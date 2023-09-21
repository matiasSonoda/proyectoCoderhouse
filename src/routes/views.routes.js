import { Router } from "express";
import productModel from "../models/products.model.js";
import usersModel from "../models/users.model.js";
import sessionsRouter from "./sessions.routes.js";
import cartRoutes from "./carts.routes.js";


const viewsRouter = Router()

viewsRouter.get("/realtimeproducts", async(req,res)=>{
  const products = await productModel.find().lean()
    res.render("realTimeProducts",{
        rutaCSS:"realTimeProducts",
        rutaJS:"realTimeProducts",
        products,
    })
})

viewsRouter.get("/home", async(req,res)=>{
    const products = await productModel.find().lean()
    const info= req.query.info
    res.render("home",{
        rutaCSS:"home",
        rutaJS:"home",
        products,
        info,
    })
})
/*viewsRouter.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send('Usuario no encontrado');
      }
      if (user.password !== req.body.password) { 
        return res.status(400).send('Contraseña incorrecta');
      }
      req.session.user = user; // Guarda el usuario en la sesión
      res.redirect('/api/products'); // Redirige al usuario a la página de productos después del inicio de sesión
    } catch (error) {
      res.status(500).send(error);
    }
  });*/
/*viewsRouter.get("/signin",async(req,res)=>{
  res.render("signin")
})
viewsRouter.post('/signin', async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.redirect('/login'); // Redirige al usuario a la página de login después del registro
    } catch (error) {
      res.status(500).send(error);
    }
  });*/

  export default viewsRouter