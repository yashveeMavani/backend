import { timeStamp } from "console";
import mongoose from "mongoose";
const medicalrecSchema = mongoose.Schema({},{timeStamp:true})
export const Medicalrec = mongoose.model("Medicalrec",medicalrecSchema)