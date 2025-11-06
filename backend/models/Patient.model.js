import mongoose, { Schema } from 'mongoose';
const PatientSchema=new Schema({
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
        default:"Patient"
    }
})
const Patient=mongoose.model('Patient',PatientSchema);
export default Patient;