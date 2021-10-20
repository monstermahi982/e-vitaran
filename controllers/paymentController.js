import CustomErrorhandler from '../services/CustomErrorHandler';
import { PaymentDetail, User } from '../models'
import Joi, { number } from 'joi'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { RAZORPAY_KEY, RAZORPAY_SECRET } from '../config'

const paymentController = {

    async allTransactions(req, res, next) {

        let documents;

        try {
            documents = await PaymentDetail.find().select('-updatedAt -__v').sort({ _id: -1 });
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    async getOneTransaction(req, res, next) {

        let documents;

        try {
            documents = await PaymentDetail.findOne({ _id: req.params.id }).select('-updatedAt -__v');
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    async doPayment(req, res, next) {

        try {
            const instance = new Razorpay({
                key_id: RAZORPAY_KEY, // YOUR RAZORPAY KEY
                key_secret: RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
            });

            let amount = parseInt(req.body.amount);
            amount = amount * 100;

            const options = {
                amount: amount,
                currency: 'INR',
                receipt: 'receipt_order_74394',
            };

            const order = await instance.orders.create(options);

            if (!order) return res.status(500).send('Some error occured');

            res.json(order);
        } catch (error) {
            res.status(500).send(error);
        }
    },


    async paymentSuccess(req, res, next) {
        try {
            const {
                orderCreationId,
                razorpayPaymentId,
                razorpayOrderId,
                razorpaySignature,
                name,
                email,
                phone,
                payment
            } = req.body;

            const shasum = crypto.createHmac('sha256', RAZORPAY_SECRET);
            shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
            const digest = shasum.digest('hex');

            if (digest !== razorpaySignature) {
                return res.status(400).json({ msg: 'Transaction not legit!' });
            }


            const newPayment = PaymentDetail({
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
                signature: razorpaySignature,
                success: true,
                name: name,
                email: email,
                phone: phone,
                payment: payment
            });

            await newPayment.save();

            // update bill unit to 0 and bill status paid
            try {
                await User.findOneAndUpdate({ _id: req.body.id }, {
                    bill_unit: 0,
                    bill_status: "paid"
                }, { new: true });


            } catch (err) {
                return next(err);
            }

            res.json({
                msg: 'success',
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

}


export default paymentController;