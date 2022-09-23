/**
 * Handling all user specific functionality
 * will be handle in this controller
 */
// import packages
let fs = require('fs');
let jwt = require('jsonwebtoken');

// import models
let User = require('../models/User.js');

// import constant & config
const constant = require('../constant/constant.js');

/**
 * add new user
 * @param {Object} req , req object for the current request
 * @param {Object} res , response obj to handle the response for the request
 */
exports.addUser = async (req, res) => {
  const { username, email, first_name, last_name } = req.body;

  let newUser = new User();

  newUser.username = username;
  newUser.first_name = first_name;
  newUser.last_name = last_name;
  newUser.email = email;

  try {
    let savedUser = await newUser.save();

    // const token = await generateJWT(savedUser);
    return res.status(constant.CODE.SUCCESS).send({
      user: savedUser,
    })
  } catch (err) {
    return res.status(constant.CODE.SERVERERROR).send({
      message: constant.MESSAGES.SOMETHINGWENTWRONG,
      err: err
    });
  }
}


/**
 * update user
 * @param {Object} req , req object for the current request
 * @param {Object} res , response obj to handle the response for the request
 */
exports.updateUser = async (req, res) => {
  const updateUserDto = req.body;
  const id = req.params.id;

  try {
    let newUser = await update(id, updateUserDto);

    return res.status(constant.CODE.SUCCESS).send(newUser);
  } catch (err) {
    return res.status(constant.CODE.SERVERERROR).send({
      message: constant.MESSAGES.SOMETHINGWENTWRONG,
      err: err
    });
  }
}

/**
 * find user
 * @param {Object} req , req object for the current request
 * @param {Object} res , response obj to handle the response for the request
 */
 exports.findUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id });

    return res.status(constant.CODE.SUCCESS).send(user);
  } catch (err) {
    return res.status(constant.CODE.SERVERERROR).send({
      message: constant.MESSAGES.SOMETHINGWENTWRONG,
      err: err
    });
  }
}

/**
 * find all users
 * @param {Object} req , req object for the current request
 * @param {Object} res , response obj to handle the response for the request
 */
 exports.findAllUsers = async (req, res) => {
  try {
    let users = await User.find();

    return res.status(constant.CODE.SUCCESS).send(users);
  } catch (err) {
    return res.status(constant.CODE.SERVERERROR).send({
      message: constant.MESSAGES.SOMETHINGWENTWRONG,
      err: err
    });
  }
}

/**
 * delete user
 * @param {Object} req , req object for the current request
 * @param {Object} res , response obj to handle the response for the request
 */
 exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    let result = await User.deleteOne({ _id: id});

    return res.status(constant.CODE.SUCCESS).send(result);
  } catch (err) {
    return res.status(constant.CODE.SERVERERROR).send({
      message: constant.MESSAGES.SOMETHINGWENTWRONG,
      err: err
    });
  }
}

const update = async (id, updateUserDto) => {
  const newUser = await User.findOneAndUpdate({ _id: id }, updateUserDto, {new: true});
  return newUser ?? null;
}

// const generateJWT = async (user) => {
//   let today = new Date();
//   let exp = new Date(today);
//   exp.setDate(today.getDate() + 60);

//   let payload = {
//     id: user._id,
//     username: user.username,
//     email: user.email,
//     exp: exp.getTime() / 1000,
//   }

//   let cert = fs.readFileSync(`${process.cwd()}/keys/private.pem`);

//   return jwt.sign(
//     payload,
//     {
//       key: cert,
//       passphrase: process.env.PASS_PHRASE
//     },
//     {
//       algorithm: 'RS256'
//     }
//   );
// }