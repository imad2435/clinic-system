import mongoose from 'mongoose';
const DoctorSchema= new mongoose.Schema({
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
        required:true
    },
    role:{
        type:String,
        enum: ['Doctor'], 
        default:"Doctor"
    },
    specialization:{
        type:String
    },
    availability:[String]
},{timestamps:true})

const Doctor =mongoose.model('Doctor',DoctorSchema);
export default Doctor;