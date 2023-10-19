import productModel from  "../models/products.model.js"

export const getProducts = async(req,res)=>{
    const { limit, page, sort, category, info } = req.query;
    const filter = category ? { category } : {};
    const options = {
        limit: parseInt(limit) || 10,
        page: parseInt(page),
        sort: { price: sort || "asc" }
    };

    try {
        const products = await productModel.paginate(filter, options);
        if(products){
        res.render("home", {
            rutaCSS: "home",
            rutaJS: "home",
            info,
            products: products.docs
        });}
        else{
            res.status(404).send({error:`Productos no encontrados`})
        }
    } catch (error) {
        res.status(500).send({ error: `Error al obtener productos: ${error}` });
    }
}

export const getProduct = async(req,res)=>{
    const {id}= req.params;
    try{
        const product= await productModel.findById(id)
        if (product){
            res.status(200).send({ resultado: "Ok", message: product });
        }

        res.status(404).send({error: "producto no encontrado"})
    }
    catch(error){
        res.status(500).send({error:`Error en consultar producto ${error}`})
    }
}
export const postProduct = async(req,res)=>{
    const { title, description, stock, code, price, category } = req.body;

    try {
        const newProduct = await productModel.create({ title, description, stock, code, price, category });
        res.status(200).send({ resultado: "Ok", message: newProduct });
    } catch (error) {
        res.status(400).send({ error: `Error al crear producto: ${error}` });
    }
}

export const putProduct = async(req,res)=>{
    const { id } = req.params;
    const { title, description, stock, code, price, category, status } = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, { title, description, stock, code, price, category, status });
        if (updatedProduct) {
            res.status(200).send({ resultado: "Ok", message: updatedProduct });
        } else {
            res.status(404).send({ resultado: "not found", message: updatedProduct });
        }
    } catch (error) {
        res.status(400).send({ error: `Error al actualizar producto: ${error}` });
    }
}
export const deleteProduct= async(req,res)=>{
    const { id } = req.params;

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).send({ resultado: "Ok", message: deletedProduct });
        } else {
            res.status(404).send({ resultado: "not found", message: deletedProduct });
        }
    } catch (error) {
        res.status(400).send({ error:`Error al borrar producto: ${error}` });
    }
}