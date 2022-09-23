// response messages
const MESSAGES = {
    SOMETHINGWENTWRONG: "Something went wrong.",
    ERRORCREATINGUSER: "Error while registering, Please contact admin",
    SUCCESS: "Success",
    USERNOTFOUND: "User not founded",
    SERVERERROR: 'Internal Server Error',
    CONFLICT: 'There is conflict inside server'
};

// request code number
const CODE = {
    NOTFOUND: 404,
    BADREQUEST: 400,
    SUCCESS: 200,
    CREATED: 201,
    SERVERERROR: 501,
    UNAUTHORISEDACCESS: 403,
    CONFLICT: 409
};

// in seconds
const TIMESTAMP = {
    YEAR: 31536000,
    MONTH: 2678400,
    FREE: 259200, // 3 days
    DAY: 86400
}

module.exports = {
    MESSAGES,
    CODE,
    TIMESTAMP
};