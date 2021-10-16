import Joi from 'joi'
import CustomErrorhandler from '../services/CustomErrorHandler';
import { User } from '../models'

const registerController = {
    async register(req, res, next) {

        // checking validation error
        const registerSchema = Joi.object({
            name: Joi.string().max(30).min(3).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            address: Joi.string().max(50).min(3).required()
        })

        const { error } = await registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // checking user already exists
        try {
            const exist = await User.exists({ email: req.body.email })
            if (exist) {
                return next(CustomErrorhandler.alreadyExists('This email is already exists'));
            }
        } catch (err) {
            return next(err);
        }


        const { name, email, phone, address } = req.body;

        const user = new User({
            name,
            email,
            phone,
            address
        })

        let id;

        try {
            const result = await user.save();
            id = result._id;
            console.log(result._id);
        } catch (error) {
            return next(error);
        }

        res.json({ data: "all goo d" })
    }
}

export default registerController