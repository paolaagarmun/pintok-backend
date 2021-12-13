const jwt = require('jsonwebtoken');

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
    revalidateJwt
}