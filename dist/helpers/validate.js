"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const throWError = (prop) => {
    const error = new Error(`Argument required: ${prop}`);
    error.name = "ArgumentRequiredError";
    throw error;
};
const validate = (...argumentName) => (requestBody = {}) => {
    if (!requestBody) {
        throWError("body");
    }
    argumentName.forEach((name) => {
        const value = requestBody[name];
        if (value === undefined || value === null || value === "") {
            throWError(name);
        }
    });
    return argumentName.reduce((acc, name) => {
        acc[name] = requestBody[name];
        return acc;
    }, {});
};
exports.default = validate;
