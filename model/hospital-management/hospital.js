import mongoose from "mongoose";
const  hospitalSchema= mongoose.Schema({},{timeStamp:true})
export const Hospital = mongoose.model("Hospital",hospitalSchema)