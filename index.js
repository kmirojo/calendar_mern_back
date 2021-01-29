const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Create Server
const app = express();

// Database Connection
dbConnection();

// CORS
app.use(cors());

// Middlewares
app.use(express.static("public")); // Set Public Directory
app.use(express.json()); // understands JSON requests

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// TODO: CRUD: Events

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
