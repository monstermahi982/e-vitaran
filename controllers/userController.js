import CustomErrorhandler from '../services/CustomErrorHandler';
import { User } from '../models'
import Joi from 'joi'

const userController = {

    // fetching all users
    async getUsers(req, res, next) {

        let documents;

        try {
            documents = await User.find().select('-updatedAt -__v').sort({ _id: -1 });
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },


    // pay bill handler
    async payBill(req, res, next) {

        let user;

        try {
            user = await User.findOneAndUpdate({ _id: req.params.id }, {
                bill_unit: 0,
                bill_status: "paid"
            }, { new: true });


        } catch (err) {
            return next(err);
        }

        res.json({ user });
    },

    // bill update function
    async billUpdate(req, res, next) {

        const registerSchema = Joi.object({
            bill_unit: Joi.number().required()
        })

        const { error } = await registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { bill_unit } = req.body;

        let user;

        try {
            user = await User.findOneAndUpdate({ _id: req.params.id }, {
                bill_unit,
                bill_status: "not paid"
            }, { new: true });


        } catch (err) {
            return next(err);
        }

        res.json({ user });

    },

    // fetching one user by id
    async getOneUsers(req, res, next) {

        let documents;

        try {
            documents = await User.findOne({ _id: req.params.id }).select('-updatedAt -__v');
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },


    async fetchBill(req, res, next) {
        let documents;

        try {
            documents = await User.findOne({ phone: req.params.phone }).select('-updatedAt -__v');
            if (!documents) {
                return next(CustomErrorhandler.phoneNotFound('this number is not exists'));
            }
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    // deleteing user
    async deleteUser(req, res, next) {

        let user;
        try {
            user = await User.findOneAndRemove({ _id: req.params.id });

            if (!user) {
                return next(CustomErrorhandler.alreadyExists("nothing to delete"))
            }

        } catch (err) {
            return next(err);
        }

        res.json(user);
    },

    // updating user
    async updateUser(req, res, next) {

        const registerSchema = Joi.object({
            name: Joi.string().max(30).min(3),
            email: Joi.string().email(),
            phone: Joi.number(),
            address: Joi.string().max(50).min(3)
        })

        const { error } = await registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { name, email, phone, address } = req.body;

        let user;

        try {
            user = await User.findOneAndUpdate({ _id: req.params.id }, {
                name,
                email,
                phone,
                address
            }, { new: true });


        } catch (err) {
            return next(err);
        }

        res.json({ user });
    },


    // adding new user
    async addUser(req, res, next) {

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
        } catch (error) {
            return next(error);
        }

        res.json({ data: id });
    }

}

export default userController;