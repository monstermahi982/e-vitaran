import { ValidationError } from 'joi'
import CustomErrorhandler from '../services/CustomErrorHandler';

const errorhandler = (err, req, res, next) => {

    let statusCode = 500;
    let data = {
        message: err.message
    }

    if (err instanceof ValidationError) {
        statusCode = 422;
        data = {
            message: err.message
        }
    }

    if (err instanceof CustomErrorhandler) {
        statusCode = err.status;
        data = {
            message: err.message
        }
    }

    return res.status(statusCode).json(data);

}

export default errorhandler;