import mongoose from "mongoose";
const patientSchema = mongoose.Schema({},{timeStamp:true})
export const Patient = mongoose.model("Patient",patientSchema)