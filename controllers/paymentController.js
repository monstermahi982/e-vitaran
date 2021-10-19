import CustomErrorhandler from '../services/CustomErrorHandler';
import { PaymentDetail, User } from '../models'
import Joi, { number } from 'joi'
import crypto from 'crypto'
import Razorpay from 'razorpay'

const paymentController = {

    async doPayment(req, res, next) {

        try {
            const instance = new Razorpay({
                key_id: 'rzp_test_mmO5jMIFS0U6ac', // YOUR RAZORPAY KEY
                key_secret: 'Qzi7KB9RAPfBoBbV8Ga8PabB', // YOUR RAZORPAY SECRET
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

            const shasum = crypto.createHmac('sha256', 'Qzi7KB9RAPfBoBbV8Ga8PabB');
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
            console.log("this is internal error1");
            res.status(500).send(error);
        }
    }

}


export default paymentController;