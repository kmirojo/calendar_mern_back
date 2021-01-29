const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log("DB Connection successful");
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error when initializing DB");
    }
};

module.exports = {
    dbConnection,
};
