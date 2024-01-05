// Importaciones
import { Router } from "express";
import usersModel from "../models/users.model.js";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";
import {deleteInactiveUsers, getUsers} from "../controller/users.controller.js"
// Creación del router
const usersRouter = Router();

// Ruta para mostrar la página de registro
usersRouter.get("/signin", (req, res) => {
    res.render("signin", { rutaCSS: "sign_in" });
});

// Ruta para mostrar usuarios
usersRouter.get("/", getUsers)

// Ruta para registrar un usuario
usersRouter.post("/signin", passport.authenticate("register"),async (req, res) => {res.redirect("/api/sessions/login")});

// Ruta para eliminar usuarios inactivos
usersRouter.get("/deleteInactiveUser", deleteInactiveUsers)
export default usersRouter;