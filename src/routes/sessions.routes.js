// Importaciones
import { Router } from "express";
import usersModel from "../models/users.model.js";

// Creación del router
const sessionsRouter = Router();

// Ruta para mostrar la página de inicio de sesión
sessionsRouter.get("/login", (req, res) => {
    res.render("login", { rutaCSS: "login" });
});

// Ruta para iniciar sesión
sessionsRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario es el administrador
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.login = true;
            return res.redirect("/static/realTimeProducts");
        }

        // Verificar si el usuario ya ha iniciado sesión
        if (req.session.login) {
            return res.status(200).send({ resultado: "Login ya existente" });
        }

        // Buscar al usuario en la base de datos
        const user = await usersModel.findOne({ email: email });

        if (user) {
            // Verificar la contraseña del usuario
            if (user.password === password) {
                req.session.login = true;
                return res.redirect(`/api/products?info=${user.first_name}`);
            } else {
                return res.status(401).send({ resultado: "Contraseña no válida", message: user });
            }
        } else {
            return res.status(404).send({ resultado: "not found", message: user });
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Ruta para cerrar sesión
sessionsRouter.post("/logout", (req, res) => {
    req.session.destroy((error) => console.log(error));
    res.redirect("/api/sessions/login");
});

export default sessionsRouter;