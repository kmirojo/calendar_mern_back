/**
 * User Routes / Auth
 * host + /api/auth
 */

const { Router } = require("express");
const { check } = require("express-validator");
const {
    createUser,
    loginUser,
    reValidateToken,
} = require("../controllers/auth");
const { fillValidator } = require("../middlewares/fill-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

// Route's middlewares go after the controller function

const createUserMiddleware = [
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check(
        "password",
        "Password is required and must have 6 characters"
    ).isLength({ min: 6 }),
    fillValidator,
];

const loginUserMiddleware = [
    check("email", "Email is required").isEmail(),
    check(
        "password",
        "Password is required and must have 6 characters"
    ).isLength({ min: 6 }),
    fillValidator,
];

router.post("/new", createUserMiddleware, createUser);

router.post("/", loginUserMiddleware, loginUser);

router.get("/renew", validateJWT, reValidateToken);

module.exports = router;
