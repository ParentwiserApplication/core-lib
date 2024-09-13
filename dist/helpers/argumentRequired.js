"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throwError = (prop) => {
    const error = new Error(`Eksik Alan : ${prop}`);
    error.name = "ArgumentRequiredError";
    throw error;
};
const required = (...argumentName) => (requestBody = {}) => {
    if (!requestBody) {
        throwError("body");
    }
    argumentName.forEach((name) => {
        const value = requestBody[name];
        if (value === undefined || value === null || value === "") {
            throwError(name);
        }
    });
};
exports.default = required;
