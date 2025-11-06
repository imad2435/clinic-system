import Admin from '../models/Admin.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ------------------- Register Admin -------------------
export const  registerAdmin=async(req,res) => {
    try {
        const {name,email,password,role}=req.body;
        const existing=await Admin.findOne({email});
        if(existing)return res.status(400).json({message:"Admin already exists"});
        const hashedpassword=bcrypt.hashedpassword(password,10);
        const admin= await Admin.create({
              name,
              email,
              password:hashedpassword,
              role
        })
    
        res.status(201).json({ message: "Admin registered successfully", admin });
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
}
// ------------------- Login Admin -------------------
export const loginAdmin=async (req,res) => {
    try {
        const {email,password}=req.body;
        const admin=await Admin.findOne({email});
        if(!admin) res.status(400).json({message:"Admin does not Exist"});
        const isMatch=bcrypt.compare(password,Admin.password);
        if(!isMatch) res.status(400).json("Invalid Email Or Password");
        const token=jwt.sign(
            {id:admin._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.json({token,Admin})
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
    
}
// ------------------- Get All Admins -------------------
export const getAdmin=async (req,res) => {
    try {
        const admins=await Admin.find(); // Fetch all Admins
        res.status(200).json({admins})
    } catch (error) {
            res.status(500).json({ message: error.message });
    }
    
}