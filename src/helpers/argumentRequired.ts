const throwError = (prop: string) => {
    const error = new Error(`Eksik Alan : ${prop}`);
    error.name = "ArgumentRequiredError";
    throw error;
};

const required = (...argumentName: any[]) => (requestBody: any = {}) => {
    if (!requestBody) {
        throwError("body");
    }

    argumentName.forEach((name: string) => {
        const value = requestBody[name];

        if (value === undefined || value === null || value === "") {
            throwError(name);
        }

    });
};

export default required;
