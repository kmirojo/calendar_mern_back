const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req, res = response, next) => {
    const token = req.header("x-token");

    if (!jwt) {
        return res.status(401).json({
            ok: false,
            msg: "No token in the request",
        });
    }

    try {
        const { uid, name } = await jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token Invalid",
        });
    }

    next();
};

module.exports = {
    validateJWT,
};
