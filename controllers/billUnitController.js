import CustomErrorhandler from '../services/CustomErrorHandler';
import { BillUnit } from '../models'
import Joi from 'joi'

const billUnitController = {

    // fetching one user by id
    async getBillInfo(req, res, next) {

        let documents;

        try {
            documents = await BillUnit.findOne({ _id: '616d1484919b352fe883dbcc' }).select('-updatedAt -__v');
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    // updating user
    async updateBillInfo(req, res, next) {

        const billUnitSchema = Joi.object({
            fixedCharge: Joi.number().max(1000).min(1).required(),
            rangeA: Joi.number().max(20).min(1).required(),
            rangeB: Joi.number().max(20).min(1).required(),
            rangeC: Joi.number().max(20).min(1).required(),
            rangeD: Joi.number().max(20).min(1).required(),
            rangeE: Joi.number().max(20).min(1).required(),
            elecDuty: Joi.number().max(10).min(1).required(),
            tax: Joi.number().max(100).min(1).required()
        })

        const { error } = await billUnitSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { fixedCharge, rangeA, rangeB, rangeC, rangeD, rangeE, elecDuty, tax } = req.body;

        let billInfo;

        try {
            billInfo = await BillUnit.findOneAndUpdate({ _id: '616d1484919b352fe883dbcc' }, {
                fixedCharge,
                rangeA,
                rangeB,
                rangeC,
                rangeD,
                rangeE,
                elecDuty,
                tax
            }, { new: true });


        } catch (err) {
            return next(err);
        }

        res.json(billInfo);
    },

    // // adding new Employee
    // async addBillInfo(req, res, next) {

    //     // checking validation error
    //     const billUnitSchema = Joi.object({
    //         fixedCharge: Joi.number().max(1000).min(1).required(),
    //         rangeA: Joi.number().max(20).min(1).required(),
    //         rangeB: Joi.number().max(20).min(1).required(),
    //         rangeC: Joi.number().max(20).min(1).required(),
    //         rangeD: Joi.number().max(20).min(1).required(),
    //         rangeE: Joi.number().max(20).min(1).required(),
    //         elecDuty: Joi.number().max(10).min(1).required(),
    //         tax: Joi.number().max(100).min(1).required()
    //     })

    //     const { error } = await billUnitSchema.validate(req.body);

    //     if (error) {
    //         return next(error);
    //     }

    //     // checking Employee already exists
    //     try {
    //         const exist = await BillUnit.exists({ email: req.body.email })
    //         if (exist) {
    //             return next(CustomErrorhandler.alreadyExists('This email is already exists'));
    //         }
    //     } catch (err) {
    //         return next(err);
    //     }

    //     const { fixedCharge, rangeA, rangeB, rangeC, rangeD, rangeE, elecDuty, tax } = req.body;

    //     const billUnit = new BillUnit({
    //         fixedCharge,
    //         rangeA,
    //         rangeB,
    //         rangeC,
    //         rangeD,
    //         rangeE,
    //         elecDuty,
    //         tax
    //     })

    //     let id;

    //     try {
    //         const result = await billUnit.save();
    //         id = result._id;
    //     } catch (error) {
    //         return next(error);
    //     }

    //     res.json({ data: id });
    // }

}

export default billUnitController;