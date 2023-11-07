import { Router } from "express";
import cartRoutes from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionsRouter from "./sessions.routes.js";
import usersRouter from "./users.routes.js";
import viewsRouter from "./views.routes.js";
import mokingRoutes from "./moking.routes.js"
const router= Router()


router.use("/static", viewsRouter )
router.use("/api/products", productRouter)
router.use("/api/carts", cartRoutes)
router.use("/api/sessions", sessionsRouter)
router.use("/api/users", usersRouter)
router.use("/api/moking", mokingRoutes)

export default router