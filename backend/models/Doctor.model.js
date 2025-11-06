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
        default:"Doctor"
    },
    specialization:{
        type:String
    },
    availabilty:[String]
})

const Doctor =mongoose.model('Doctor',DoctorSchema);
export default Doctor;