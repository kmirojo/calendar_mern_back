const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate("user", "name");

    res.json({
        ok: true,
        events,
    });
};
const createEvent = async (req, res) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;

        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            event: savedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please Contact Admin",
        });
    }
};

const updateEvent = async (req, res) => {
    const eventId = req.params.id;

    const { uid } = req;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "This user doesn't have permissions to update this event",
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true, //bring new updated changes
        });

        res.status(200).json({
            ok: true,
            event: updatedEvent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please Contact Admin",
        });
    }
};

const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event not found",
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "This user doesn't have permissions to update this event",
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: "Event Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please Contact Admin",
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
