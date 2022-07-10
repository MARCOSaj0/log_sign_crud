const express = require('express');
const userController = require('../controller/userController');
 
const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/upUser/:id', userController.upUser);

router.delete('/delUser/:id', userController.delUser);

router.post('/changePass/:id', userController.changePass);

module.exports = router;