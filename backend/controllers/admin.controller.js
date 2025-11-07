 import Admin from '../models/Admin.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ------------------- Register Admin -------------------
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 🔸 Validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // 🔸 Check if admin already exists
        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // 🔸 Hash password (await was missing in your first version)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔸 Create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: "Admin registered successfully", admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ------------------- Login Admin -------------------
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

       //validation
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // 🔸 Check admin existence
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Admin does not exist" });
        }

        // 🔸 Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 🔸 Generate JWT Token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 🔸 Hide password before sending response
        const { password: _, ...adminData } = admin._doc;

        res.status(200).json({ message: "Login successful", token, admin: adminData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ------------------- Get All Admins -------------------
export const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select("-password"); // Hide passwords
        res.status(200).json({ admins });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
