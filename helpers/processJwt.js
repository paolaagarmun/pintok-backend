const jwt = require('jsonwebtoken');
const User = require('../Schemas/User');

const generateJwt = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {id: id},
            process.env.SECRET_KEY,
            { expiresIn: "4h"},
            (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token);
                }
            }
        );
    });
};

const validateJwt = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({message: "Toekn not found"});
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(id);
        next();
    } catch (error) {
        return res.json(error)
    }
}

const revalidateJwt = async (req, res, next) => {
    const user = req.user;
    const token = await generateJwt(user._id)
    try {
        return res.json({user, token})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    generateJwt,
    revalidateJwt,
    validateJwt
}