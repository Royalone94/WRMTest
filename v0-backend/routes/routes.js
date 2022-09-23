let express = require('express');
var router = express.Router();
let { param, body, check, validationResult } = require('express-validator');
let mongoose = require('mongoose');
let constant = require('../constant/constant.js');
let user_controller = require("../controllers/user.js");

// const { requireAuth } = require("../lib/middleware.js");

// add user
router.post("/add",
    body('email').isEmail(),
    check('username').exists(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(constant.CODE.BADREQUEST).json({ errors: errors.array() });
        else
            user_controller.addUser(req, res);
    }
);

// update user
router.patch("/update/:id",
    param('id').exists(),
    param('id').customSanitizer(value => {
        return mongoose.Types.ObjectId(value)
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(constant.CODE.BADREQUEST).json({ errors: errors.array() });
        else user_controller.updateUser(req, res);
    }
);

// find user
router.get("/user/:id",
    param('id').exists(),
    param('id').customSanitizer(value => {
        return mongoose.Types.ObjectId(value)
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(constant.CODE.BADREQUEST).json({ errors: errors.array() });
        else user_controller.findUser(req, res);
    }
);

// find all users
router.get("/users_all",
    (req, res) => {
        user_controller.findAllUsers(req, res);
    }
);

// delete user
router.delete("/delete/:id",
    param('id').exists(),
    param('id').customSanitizer(value => {
        return mongoose.Types.ObjectId(value)
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(constant.CODE.BADREQUEST).json({ errors: errors.array() });
        else user_controller.deleteUser(req, res);
    }
);

module.exports = router;