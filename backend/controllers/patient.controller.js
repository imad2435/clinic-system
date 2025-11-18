 import Patient from '../models/Patient.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ------------------- Register Patient -------------------
export const registerPatient = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) 
            return res.status(400).json({ message: "Please fill all fields" });

        const existing = await Patient.findOne({ email });
        if (existing) 
            return res.status(400).json({ message: "Patient already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const patient = await Patient.create({
            name,
            email,
            role: role || "Patient",
            password: hashedPassword
        });

        const { password: _, ...patientData } = patient._doc;

        res.status(201).json({
            message: "Patient registered successfully",
            patient: patientData
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ------------------- Login Patient -------------------
export const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) 
            return res.status(400).json({ message: "Please fill all fields" });

        const patient = await Patient.findOne({ email });
        if (!patient) 
            return res.status(400).json({ message: "Patient does not exist" });

        const ismatch = await bcrypt.compare(password, patient.password);
        if (!ismatch) 
            return res.status(400).json({ message: "Invalid Email or Password" });

        const token = jwt.sign(
            { id: patient._id, role: patient.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const { password: _, ...patientData } = patient._doc;

        res.status(200).json({ token, patient: patientData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ------------------- Get All Patients -------------------
export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().select("-password");
        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
