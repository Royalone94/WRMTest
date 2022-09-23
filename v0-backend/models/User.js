let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// user schema definition
let UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);