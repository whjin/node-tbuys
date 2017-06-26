"use strict";

module.exports = {
    user: {
        name: { type: String, required: true },
        password: { type: String, required: true },
        gender: { type: Boolean, default: true }
    },
    commodity: {
        name: String,
        price: Number,
        imgSrc: String
    }
};
//# sourceMappingURL=models.js.map