export const generateUserErrorInfo = (user) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * first_name: needs to be a string, received ${user.first_name}
    * last_name: needs to be a string, received ${user.last_name}
    * email: needs to be a string, received ${user.email}`
}

export const LoginUserErrorInfo = (user) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * email: needs to be a string, received ${user.email}
    * password: needs  to be a string, received ${user.password}`
}

export const productErrorInfo = (product) =>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * title: needs to be a string, received ${product.title}
    * price: needs  to be a number, received ${product.price}
    * category: needs to be a string, received ${product.category}
    * code: needs to be a string, received ${product.code}`
}


/*const productSchema = new Schema({
        title:{
            type:String,
            required:true
        },
        description: {
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        stock: {
            type:Number,
            required:true
        },
        category:{
            type:String,
            index:true,
            required:true
        },
        status:{
            type:Boolean,
            default: true
        },
        code:{
            type:String,
            required:true,
            unique: true
        },
        thumbnails:[]
*/ 