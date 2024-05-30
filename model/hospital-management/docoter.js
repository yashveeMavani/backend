import mongoose from "mongoose";
const docoterSchema = mongoose.Schema({},{timeStamp:true})
export const Docoter = mongoose.model("Docoter",docoterSchema)