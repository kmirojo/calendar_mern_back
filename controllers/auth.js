const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "A user with the same email already exists",
            });
        }

        user = new User(req.body);

        // Hash Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Create JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please Contact Admin",
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "No user was found with that email",
            });
        }

        // Validate Passwords
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                ok: false,
                msg: "Wrong password",
            });
        }

        // Create JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Please Contact Admin",
        });
    }
};

const reValidateToken = async (req, res = response) => {
    // uid got from validateJWT middleware
    const { uid, name } = req;

    // Create a new JWT and return it to the app
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};

module.exports = {
    createUser,
    loginUser,
    reValidateToken,
};
