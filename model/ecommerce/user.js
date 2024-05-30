
import mongoose from "mongoose";
import { type } from "os";
const userSchema = mongoose.Schema({
    username:{
       type:String,
       required:true,
       unique:true,
       lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        require:true
    },
},{timeStamp:true})

export const User = mongoose.model("User",userSchema)