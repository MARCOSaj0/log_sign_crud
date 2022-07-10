const User = require('../models/user');
const bcrypt = require('bcrypt');

const signupService = async (data) => {
    const { name, email, gender, phone, password, dob } = data;
    try {
        const hasUser = await User.findOne({ email });
        if (hasUser) {
            throw new Error("Could not create account, email already exists.");
        }
        const hasMob = await User.findOne({ phone });
        if (hasMob) {
            throw new Error("Could not create account, phone no. already exists.");
        }
        const hashedPwd = await bcrypt.hash(password, 12);
        if (!hashedPwd) {
            throw new Error("Sorry we are facing issue in register");
        }
        const newUser = new User({
            name, email, gender, phone, password: hashedPwd, dob
        });
        await newUser.save();
        return newUser;
    } catch (err) {
        console.log(err);
        throw new Error(err.message || "User signup failed.");
    }
};

const loginService = async (data) => {
    const { email, password } = data;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("No user found.");
        }
        const isPwdValid = await bcrypt.compare(password, user.password);
        if (!isPwdValid) {
            throw new Error("Credentials did not match.");
        }
        return user;
    } catch (err) {
        console.log(err);
        throw new Error(err.message || "Login failed.");
    }
};

const updateService = async (id, data) => {
    try {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        return user;
    } catch (err) {
        console.log(err);
        throw new Error(err.message || "Updation failed.");
    }
};

const delService = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error("No user found");
        }
        return;
    } catch (err) {
        console.log(err);
        throw new Error(err.message || "User deletion failed.");
    }
};

const changePass = async (id, data) => {
    try {
        const { oldPass, password } = data;
        const user = await User.findById(id);
        if (!user) {
            throw new Error("No user found.");
        }
        const isPwdValid = await bcrypt.compare(oldPass, user.password);
        if (!isPwdValid) {
            throw new Error("Old password is not correct.");
        }
        const hashedPwd = await bcrypt.hash(password, 12);
        if (!hashedPwd) {
            throw new HttpError("Error in password hashing");
        }
        const upUser = await User.findByIdAndUpdate(
            id,
            { password: hashedPwd },
            { new: true }
        );
        if (!user) {
            throw new Error("No user found");
        }
        return;
    } catch (err) {
        throw new HttpError(err.message || "Password updation failed");
    }
};

module.exports = { signupService, loginService, updateService, delService, changePass };