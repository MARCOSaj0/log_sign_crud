const userServices = require('../services/userServices');

const signup = async (req, res, next) => {
    try {
        const details = await userServices.signupService(req.body);
        res.status(200).json({ details });
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

const login = async (req, res, next) => {
    try {
        const details = await userServices.loginService(req.body);
        res.status(200).json({ details });
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

const upUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const details = await userServices.updateService(id, req.body);
        res.status(200).json({ details });
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

const delUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const details = await userServices.delService(id);
        res.status(200).json({ success: true, data: null, message: "Account deleted Succefully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, data: null, message: err.message});
    }
};

module.exports = {signup, login, upUser, delUser};