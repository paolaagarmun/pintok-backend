const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { loginUser, signUpUser, googleLogin } = require('../controllers/userController');
const { revalidateJwt, validateJwt } = require('../helpers/processJwt');
const { validateFields } = require('../helpers/validateFields')


router.post("/login", 
    [
        check("email", "You are required to enter an email").isEmail(),
        check("password", "You are required to enter a password").not().isEmpty(),
        validateFields
    ] ,loginUser);

router.post("/signup", 
    [
        check("name", "You are required to enter a name").not().isEmpty(),
        check("email", "You are required to enter a valid email").isEmail(),
        check("password", "Enter a valid password").not().isEmpty(),
        validateFields
    ],signUpUser);

router.post("/googleLogin", googleLogin);

router.post("/renew", validateJwt, revalidateJwt);

module.exports = router;