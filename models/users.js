import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    bill_unit: { type: Number, required: true, default: 0 },
    bill_status: { type: String, required: true, default: 'not paid' }
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');