import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    area: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Employee', employeeSchema, 'employees');