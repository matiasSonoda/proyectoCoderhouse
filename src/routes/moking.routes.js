import { Router } from "express";
import { createProductMoking } from "../controller/mokingProducts.controller.js";

const mokingRoutes = Router()

mokingRoutes.get("/mokingproducts", createProductMoking)

export default mokingRoutes