import mongoose from "mongoose";
const Schema = mongoose.Schema;

const billUnitSchema = new Schema({
    fixedCharge: { type: Number, required: true },
    rangeA: { type: Number, required: true },
    rangeB: { type: Number, required: true },
    rangeC: { type: Number, required: true },
    rangeD: { type: Number, required: true },
    rangeE: { type: Number, required: true },
    elecDuty: { type: Number, required: true },
    tax: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('BillUbit', billUnitSchema, 'billunit');