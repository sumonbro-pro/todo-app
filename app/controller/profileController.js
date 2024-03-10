const profileModel = require('../model/profileModel');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config').jwt_secret_key;

// CREATE PROFILE
exports.create = async (req, res) => {
    try {
        const reqBody = req.body;
        await profileModel.create(reqBody);
        res.status(201).json({status: "success", data: reqBody});
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
}

//LOGIN PROFILE
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await profileModel.findOne({email: email, password: password});
        if (user) {
            const payload = {exp: Math.floor(Date.now()/1000) + (60*60*24),data: user.email}
            const token = jwt.sign(payload, jwtSecret);
            res.status(200).json({status: 'logged in', token: token, data: user});
        } else {
            res.status(401).json({status: 'Not found', message: 'User not found'});
        }
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
}

// VIEW PROFILE
exports.profile = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const user = await profileModel.findOne({email: email});
        if (user) {
            res.status(200).json({status: 'success', message: user});
        } else {
            res.status(404).json({status: 'not found', message: 'user not found'});
        }
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
}

// UPDATE PROFILE
exports.update = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const reqBody = req.body;
        const user = await profileModel.updateOne({email: email}, reqBody);
        if (user) {
            res.status(200).json({status: "updated", data: reqBody});
        } else {
            res.status(404).json({status: 'not found', message: 'user not found'});
        }
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
}

// DELETE PROFILE
exports.delete = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const deletedUser = await profileModel.deleteOne({email: email});
        if (deletedUser.deletedCount === 1) {
            res.status(200).json({status: "deleted", data: deletedUser});
        } else {
            res.status(404).json({status: 'not found', message: 'user not fount'});
        }
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
}