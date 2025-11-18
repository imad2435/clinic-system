// backend/models/Patient.model.js
import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Patient"
    }
}, { timestamps: true });

const Patient = mongoose.model('Patient', PatientSchema);
export default Patient;