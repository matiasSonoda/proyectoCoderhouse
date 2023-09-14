import express from "express";
import "dotenv/config"
import productRouter from "./routes/products.routes.js";
import mongoose from "mongoose";
import cartRoutes from "./routes/carts.routes.js";
import cartsModel from "./models/carts.model.js";

const app= express()
const PORT= 4000;

mongoose.connect(process.env.MONGO_URL)
.then(async ()=> {
console.log("BDD conectada")
//await cartsModel.create({})
//const cart = await cartsModel.findOne({_id:"64fbe6651e9b3f2c80598459"}).populate("products.id_prod")
//console.log(JSON.stringify(cart))
}
)

.catch((error)=>console.log("error de conexion mongoDb Atlas: " ,error))

app.use(express.json())
app.use("/api/products", productRouter)
app.use("/api/carts", cartRoutes)
app.listen(PORT,()=>{
    console.log(`server on ${PORT}`)
})