/**
 * User Routes / Events
 * host + /api/events
 */

const { Router } = require("express");
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { fillValidator } = require("../middlewares/fill-validator");
const { isDate } = require("../helpers/isDate");

const eventMiddleware = [
    check("title", "There must be a title").notEmpty(),
    check("start", "There must be a start date").custom(isDate),
    check("end", "There must be an end date").custom(isDate),
    fillValidator,
];

const router = Router();
router.use(validateJWT); // all routes here must use the validateJWT middleware to verify the token

router.get("/", getEvents);

router.post("/", eventMiddleware, createEvent);

router.put("/:id", eventMiddleware, updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
