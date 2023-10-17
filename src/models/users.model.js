import { Schema,model } from "mongoose";    
import cartsModel from "./carts.model.js";
const usersSchema = new Schema({
    first_name:{
        require:true,
        type:String
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:{
        type:Number,
        requiere:true
    },
    password:{
        type:String,
        require:true
    },
    rol:{
        type: String,
        default: "user"
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref:"carts"
}})

usersSchema.pre("save", async function(next){
        try{
            const newCart = await cartsModel.create({})
            this.cart = newCart._id

        }
        catch(error){
            next(error)
        }
})

const usersModel = model("users", usersSchema)
export default usersModel