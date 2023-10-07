import { Schema,model } from "mongoose";    

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
        type:[
            {    
                id_prod:{
                    type: Schema.Types.ObjectId,
                    ref:"products",
                    required:true
                        }
    }]
}})

const usersModel = model("users", usersSchema)
export default usersModel