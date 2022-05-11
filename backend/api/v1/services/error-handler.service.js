
function hanldeError(error) {
    let handle = { statusCode: 500, message: 'Error genérico' };
    console.log('Error handler: ', error);
    if (error instanceof AuthenticationError) {
        handle.statusCode = 401;
        handle.message = error.message;
    } else if(error instanceof CustomError) {
        handle.statusCode = error.statusCode;
        handle.message = error.message;
    }else {
        let revert = getRevertReason(error);
        handle.message = revert;
    }
    return [handle.statusCode, handle.message];
}

function getRevertReason(error){
    let err = error.toString();
    return err.substring(57);
}

class AuthenticationError extends Error {
    constructor(name, message) {
      super(message)
        if (Error.captureStackTrace) { Error.captureStackTrace(this, AuthenticationError); }
        this.name = name;
    }
}

class ContractError extends Error {
    constructor(name, message) {
      super(message)
        if (Error.captureStackTrace) { Error.captureStackTrace(this, ContractError); }
        this.name = name;
    }
}

class CustomError extends Error {
    constructor(name, message, statusCode) {
      super(message)
        if (Error.captureStackTrace) { Error.captureStackTrace(this, CustomError); }
        this.name = name;
        this.statusCode = statusCode;
    }
}

module.exports = {
    hanldeError,
    AuthenticationError,
    CustomError,
    ContractError,
};