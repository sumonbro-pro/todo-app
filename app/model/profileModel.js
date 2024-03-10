const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const model = mongoose.model('profiles', schema);
module.exports = model;