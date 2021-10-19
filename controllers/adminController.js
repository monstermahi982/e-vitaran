import CustomErrorhandler from '../services/CustomErrorHandler';
import { Admin } from '../models'
import Joi from 'joi'

const adminController = {
    async getAdmin(req, res, next) {

        let documents;

        try {
            documents = await Admin.find().select('-updatedAt -__v').sort({ _id: -1 });
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    async validateAdmin(req, res, next) {
        let data = '';
        try {
            data = await Admin.exists({ email: req.body.email })
        } catch (err) {
            return next(err);
        }

        res.json(data)

    },

    async addAdmin(req, res, next) {

        // checking validation error
        const registerSchema = Joi.object({
            name: Joi.string().max(30).min(3).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required()
        })

        const { error } = await registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // checking user already exists
        try {
            const exist = await Admin.exists({ email: req.body.email })
            if (exist) {
                return next(CustomErrorhandler.alreadyExists('This email is already exists'));
            }
        } catch (err) {
            return next(err);
        }

        const { name, email, phone, address, area } = req.body;

        const user = new Admin({
            name,
            email,
            phone,
        })

        let id;

        try {
            const result = await user.save();
            id = result._id;
        } catch (error) {
            return next(error);
        }

        res.json({ data: id });
    }
}

export default adminController;