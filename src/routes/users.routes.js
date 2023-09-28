// Importaciones
import { Router } from "express";
import usersModel from "../models/users.model.js";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";
// Creación del router
const usersRouter = Router();

// Ruta para mostrar la página de registro
usersRouter.get("/signin", (req, res) => {
    res.render("signin", { rutaCSS: "sign_in" });
});
/*const { first_name, last_name, email, password, age } = req.body;

    try {
        const hashPassowrd= createHash(password)
        const newUser = await usersModel.create({ first_name: first_name,last_name: last_name,email: email,age: age,password: hashPassowrd });
        await newUser.save();
        res.redirect('/api/sessions/login');
    } catch (error) {
        res.status(400).send(error);
    }*/ 
// Ruta para registrar un usuario
usersRouter.post("/", passport.authenticate("register"),async (req, res) => {
    try{
        if (!req.user){
            return res.status(400).send({mensaje:`usuario ya existente`})
        }
        return res.status(200).send({mensaje: `Usuario creado`})
    }catch(error){
            res.status(500).send({mensaje:`error al crear usuario: ${error}`})
    }
});

export default usersRouter;