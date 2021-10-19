import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PaymentDetailsSchema = mongoose.Schema({
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
    success: { type: Boolean, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    payment: { type: Number, required: true }
});


export default mongoose.model('Payment', PaymentDetailsSchema, 'payments');