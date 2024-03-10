const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    email: {type: String, required: true},
    title: {type: String, required: true},
    desc: {type: String, required: true},
    status: {type: String, default: 'New'}
}, {timestamps: true, versionKey: false});

const model = mongoose.model('todos', schema);
module.exports = model;