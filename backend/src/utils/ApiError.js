/* NOTE :- this is to structure our error messages and error outputs for easy debugging.  */

class ApiError extends Error{
    constructor(statusCode, message="Something went wrong", errors=[], stack=""){
        super(message)
        this.statusCode = statusCode;
        this.data = null,
        this.message = message,
        this.success = false,
        this.errors = errors

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}