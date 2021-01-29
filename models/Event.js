const { Schema, model } = require("mongoose");

const EventSchema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId, // Type of user's ID
            ref: "User", // Reference to User model
            required: true,
        },
    },
    {
        versionKey: false, //→ Removes the version slot
        timestamps: true, //→ CreatedAt & UpdatedAt
    }
);

// ↓ Just to preview the answers, not really changing anything in the database
EventSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Event", EventSchema);
