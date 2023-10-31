import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code:{
        type: String,
        required:true,
    },
    purchase_dateTime:{
        type: Date,
        default:Date.now
    },
    amount: Number,
    purchaser: {
        type:String,
        required:true   
    }
})

const ticketModel =  model("tickets", ticketSchema)
export default ticketModel