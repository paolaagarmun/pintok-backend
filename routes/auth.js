const express = require('express');
const router = express.Router();

const { loginUser, signUpUser } = require('../controllers/userController');
const { revalidateJwt, validateJwt } = require('../helpers/processJwt');


router.post("/login", loginUser)
router.post("/signup", signUpUser)

router.post("/renew", validateJwt, revalidateJwt);

module.exports = router;