declare class Logger {
    private timestamp;
    private level;
    private message;
    private meta;
    private filePath;
    private logDir;
    private elasticEndpoint;
    constructor(level: any, message: any);
    static info(message: any): Logger;
    static warn(message: any): Logger;
    static error(message: any): Logger;
    withMeta(meta: any): this;
    toConsole(): this;
    toFile(): this;
    toElastic(index?: string, userId?: string): Promise<this>;
}
export default Logger;
