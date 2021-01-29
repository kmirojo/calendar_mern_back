const moment = require("moment");

const isDate = (value) => {
    if (!value) {
        return false;
    }

    const date = moment(value);
    if (date.isValid()) {
        // If is a valid moment date value
        return true;
    } else {
        return false;
    }
};

module.exports = {
    isDate,
};
