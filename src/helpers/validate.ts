const throWError = (prop: string) => {
    const error = new Error(`Argument required: ${prop}`);
    error.name = "ArgumentRequiredError";
    throw error;
};

const validate = (...argumentName: string[]) => (requestBody: any = {}) => {
    if (!requestBody) {
        throWError("body");
    }

    argumentName.forEach((name: string) => {
        const value = requestBody[name];

        if (value === undefined || value === null || value === "") {
            throWError(name);
        }
    });

    return argumentName.reduce((acc, name) => {
        acc[name] = requestBody[name];
        return acc;
    }, {} as Record<string, any>);
};

export default validate;
