// Importaciones
import { Router } from "express";
import usersModel from "../models/users.model.js";
import {validatePassword} from "../utils/bcrypt.js"
import { passportError, authorization } from "../utils/messageErrors.js";
import passport from "passport";
import { postLogoutSession,postLoginSession } from "../controller/sessions.controller.js";
import { postJwtLoginSession } from "../controller/jwtSessions.controller.js";
// Creación del router
const sessionsRouter = Router();

// Ruta para mostrar la página de inicio de sesión
sessionsRouter.get("/login", (req, res) => {
    res.render("login", { rutaCSS: "login" });
});

/* const { email, password } = req.body;

    try {
        // Buscar al usuario en la base de datos
        const user = await usersModel.findOne({ email: email });

        // Verificar si el usuario es el administrador
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.login = true;
            return res.redirect("/static/realTimeProducts");
        }

        // Verificar si el usuario ya ha iniciado sesión
        if (req.session.login) {
            return res.status(200).send({ resultado: "Login ya existente" });
        }

    
        if (user) {
            // Verificar la contraseña del usuario
            if (validatePassword(password,user.password)) {
                req.session.login = true;
                return res.redirect(`/api/products?info=${user.first_name}`);
            } else {
                return res.status(401).send({ resultado: "Contraseña no válida", message: user.email });
            }
        } else {
            return res.status(404).send({ resultado: "not found", message: user });
        }
    } catch (error) {
        return res.status(400).send(error);
    }*/ 
// Ruta para iniciar sesión
sessionsRouter.post("/login",passport.authenticate("login"), postLoginSession);

// Ruta para cerrar sesión
sessionsRouter.post("/logout", (req, res) => {postLogoutSession});

//Ruta de inicio sesion con JWT
//sessionsRouter.get("/testJWT", passport.authenticate("jwt",{session:true}), async (req,res)=>{postJwtLoginSession})

//sessionsRouter.get("/github", passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})

sessionsRouter.get("/current", passportError("jwt"),authorization("user"),(req,res)=>{res.send(req.user)})

//sessionsRouter.get("/githubSession",passport.authenticate("github"),async (req,res)=>{})
export default sessionsRouter;