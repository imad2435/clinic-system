import Patient from '../models/Patient.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ------------------- Register Patient -------------------
export const registerPatient=async (req,res) => {
    try {
        const {name,email,password,role}=req.body;
        const existing=await Patient.findOne({email});
        if(existing) return res.status(400).json({message:"Patient already exists"});   
        const hashedPassword=await bcrypt.hash(password,10);
        const patient = new Patient.create({
            name,email,role,password:hashedPassword
        })
        
        res.status(201).json({ message: "Patient registered successfully", patient });
    } catch (error) {
           res.status(500).json({ message: error.message });
    }
}
// ------------------- Login Patient -------------------
export const loginPatient=async (req, res) => {
    try {
        const {email,password}=req.body;
        const patient=await findOne({email});
        if(!patient) return res.status(400).json({message:"patient already exist"});
        const ismatch=bcrypt.compare(password,patient.password);
        if(!ismatch) return res.status(400).json({message:"Invalid Email and Password"});
        const token=jwt.sign(
            {id:patient._id,role:patient.role},
            process.evn.JWT_SECRET,
            {expiresIn:"1d"}
        )
    res.status(200).json({token,patient});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// ------------------- Get All Patients -------------------
export const getPatients=async (req,res) => {
    try {
        const patients=await Patient.find(); // Fetch all patients
        res.status(200).json({patients})
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}