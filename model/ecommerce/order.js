import mongoose from "mongoose";
import { type } from "os";
import { Product } from "./product";
const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        require:true,
    }
})
const orderSchema = new mongoose.Schema(
    {
    orderprice:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems:{
        type:[orderItemSchema]
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELIVERED"],
        default:"PENDING"
    }
},{timestamps:true})
export const Order=mongoose.model("Order",orderSchema)