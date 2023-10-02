// Importaciones
import { Router } from "express";
import usersModel from "../models/users.model.js";
import {validatePassword} from "../utils/bcrypt.js"
import passport from "passport";

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
sessionsRouter.post("/login",passport.authenticate("login"), async (req, res) => {
   try{
        if(!req.user){
            res.status(401).send({mensaje: `invalidate user`})
        }
        req.session.user={
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        res.status(200).send({payload: req.user})
   }
   catch(error){
        res.status(500).send({mensaje:`error al iniciar sesion: ${error}`})
   }
});

// Ruta para cerrar sesión
sessionsRouter.post("/logout", (req, res) => {
    req.session.destroy((error) => console.log(error));
    res.redirect("/api/sessions/login");
});

sessionsRouter.get("/testJWT", passport.authenticate("jwt",{session:false}), async (req,res)=>{
    res.status(200).send(req.user)
})

sessionsRouter.get("/github", passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{
    res.status(200).send({mensaje:"Usuario creado"})
})

sessionsRouter.get("/githubSession",passport.authenticate("github"),async (req,res)=>{
    req.session.user= req.user
    res.status(200).send({mensaje:"session creada"})
})
export default sessionsRouter;