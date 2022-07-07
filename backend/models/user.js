const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Others"] },
    phone: { type: Number, required: true, unique: true, minlength: 10, maxlength: 10 },
    password: { type: String, required: true, minlength: 5 },
    status: { type: String, required: true, enum: ["pending", 'active', 'de-active'], default: "pending" },
    dob: { type: Date, required: true }
});

module.exports = mongoose.model('User', userSchema);