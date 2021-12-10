const bcrypt = require('bcrypt');
const { generateJwt } = require('../helpers/processJwt');

const User = require('../Schemas/User')

const signUpUser = async (req, res) => {
    const { email, password } = req.body;
    const testEmail = await User.findOne({email})
    if (testEmail) return res.status(500).json({message: "Couldn't create user"})

    const user = new User(req.body);

    try {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt);
        user.save()
        const token = await generateJwt(user._id)
        return res.status(201).json({user, token})
    } catch (error) {
        return res.status(500).json({message: "Couldn't create user"})
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(500).json({message: "Please check credentials"});
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(500).json({message: "Please check credentials"})
    }
    const token = await generateJwt(user._id);
    return res.status(200).json({token, user})
}

module.exports = {
    signUpUser,
    loginUser
}