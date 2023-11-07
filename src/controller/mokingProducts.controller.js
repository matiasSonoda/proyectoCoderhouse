import mokingSchema from "../models/moking.model.js"

export const createProductMoking = async (req,res)=>{
    const { number } = req.query
    const product = []
    for(let i = 0; i < number; i++){
        product.push(mokingSchema)
    }
    console.log(product)
    res.send(product)
}

