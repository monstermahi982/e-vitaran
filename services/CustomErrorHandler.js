class CustomErrorhandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }


    static alreadyExists(message) {
        return new CustomErrorhandler(409, message);
    }

    static phoneNotFound(message) {
        return new CustomErrorhandler(409, message);
    }
}


export default CustomErrorhandler;