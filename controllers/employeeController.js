import CustomErrorhandler from '../services/CustomErrorHandler';
import { Employee } from '../models'
import Joi from 'joi'

const employeeController = {

    // fetching all employee
    async getEmployee(req, res, next) {

        let documents;

        try {
            documents = await Employee.find().select('-updatedAt -__v').sort({ _id: -1 });
        } catch (error) {
            return next(error);
        }

        res.json(documents);
    },

    // fetching one user by id
    async getOneEmployee(req, res, next) {

        let documents;

        try {
            documents = await Employee.findOne({ _id: req.params.id }).select('-updatedAt -__v');
        } catch (error) {
            return next(error);
        }

        res.json({ documents });
    },

    // deleteing Employee
    async deleteEmployee(req, res, next) {

        let employee;
        try {
            employee = await Employee.findOneAndRemove({ _id: req.params.id });

            if (!employee) {
                return next(CustomErrorhandler.alreadyExists("nothing to delete"))
            }

        } catch (err) {
            return next(err);
        }

        res.json(employee);
    },

    // adding new Employee
    async addEmployee(req, res, next) {

        // checking validation error
        const registerSchema = Joi.object({
            name: Joi.string().max(30).min(3).required(),
            email: Joi.string().email().required(),
            phone: Joi.number().required(),
            area: Joi.string().max(50).min(3).required()
        })

        const { error } = await registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // checking Employee already exists
        try {
            const exist = await Employee.exists({ email: req.body.email })
            if (exist) {
                return next(CustomErrorhandler.alreadyExists('This email is already exists'));
            }
        } catch (err) {
            return next(err);
        }

        const { name, email, phone, area } = req.body;

        const employee = new Employee({
            name,
            email,
            phone,
            area
        })

        let id;

        try {
            const result = await employee.save();
            id = result._id;
        } catch (error) {
            return next(error);
        }

        res.json({ data: id });
    }

}

export default employeeController;