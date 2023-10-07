import { Express, Router } from "express";
import cartRoutes from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionsRouter from "./sessions.routes.js";
import usersRouter from "./users.routes.js";
import viewsRouter from "./views.routes.js";

const router= Router()


app.use("/static", viewsRouter )
app.use("/api/products", productRouter)
app.use("/api/carts", cartRoutes)
app.use("/api/sessions", sessionsRouter)
app.use("/api/users", usersRouter)

export default router