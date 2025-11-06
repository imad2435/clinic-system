 import Doctor from '../models/Doctor.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ------------------- Register Doctor -------------------
export const registerDoctor = async (req, res) => {
    try {
        const { name, email, password, specialization, role } = req.body;

        // Check if doctor already exists
        const existing = await Doctor.findOne({ email });
        if (existing) return res.status(400).json({ message: "Doctor already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create doctor
        const doctor = await Doctor.create({
            name,
            email,
            password: hashedPassword,
            specialization,
            role // optional, default "Doctor" in schema
        });

        res.status(201).json({ message: "Doctor registered successfully", doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ------------------- Login Doctor -------------------
export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find doctor by email
        const doctor = await Doctor.findOne({ email });
        if (!doctor) return res.status(400).json({ message: "Doctor does not exist" });

        // Check password
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

        // Create JWT token
        const token = jwt.sign(
            { id: doctor._id, role: doctor.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ token, doctor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ------------------- Get All Doctors -------------------
export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find(); // Fetch all doctors
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
