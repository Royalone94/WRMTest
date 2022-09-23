const jwt = require('jsonwebtoken');
const fs = require('fs');
let mongoose = require('mongoose');

// import models
let User = require('../models/User');

const requireAuth = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Check header or url parameters or post parameters for token
    var token = req.headers.authorization.replace(/^Bearer\s/, ''); // remove 'Bearer'
    if (token.includes('Basic')) token = req.body.access_token;

    // Decode Token
    if (token) {
        // Public Key
        let cert = fs.readFileSync(`${process.cwd()}/keys/public.pem`);
        
        jwt.verify(token, cert, { algorithm: 'RS256' }, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                const user = await User.findOne({_id: mongoose.Types.ObjectId(decoded.id)});
                user.password = undefined;

                if (!user) {
                    return res.json({ success: false, message: 'User Not Found' });
                }

                req.user = user;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

module.exports = {requireAuth};