// Importaciones
import { Router } from "express";
import usersModel from "../models/users.model.js";
import { createHash } from "../utils/bcrypt.js";

// Creación del router
const usersRouter = Router();

// Ruta para mostrar la página de registro
usersRouter.get("/signin", (req, res) => {
    res.render("signin", { rutaCSS: "sign_in" });
});

// Ruta para registrar un usuario
usersRouter.post("/signin", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        const hashPassowrd= createHash(password)
        const newUser = await usersModel.create({ first_name: first_name,last_name: last_name,email: email,age: age,password: hashPassowrd });
        await newUser.save();
        res.redirect('/api/sessions/login');
    } catch (error) {
        res.status(400).send(error);
    }
});

export default usersRouter;