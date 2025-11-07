import mongoose from 'mongoose';
const PatientSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
           enum: ['Patient'],
        default:"Patient"
    }
},{timestamps:true})
const Patient=mongoose.model('Patient',PatientSchema);
export default Patient;