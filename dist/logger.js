"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const node_path_1 = __importDefault(require("node:path"));
const kleur_1 = __importDefault(require("kleur"));
class Logger {
    constructor(level, message) {
        this.timestamp = new Date().toISOString();
        this.level = level;
        this.message = message;
        this.meta = {};
        this.logDir = './logs';
        this.filePath = node_path_1.default.join(this.logDir, `${new Date().toISOString().split('T')[0]}-log.txt`);
        this.elasticEndpoint = 'http://193.25.218.16:9200';
        if (!fs_1.default.existsSync(this.logDir)) {
            fs_1.default.mkdirSync(this.logDir, { recursive: true });
        }
    }
    static info(message) {
        return new Logger('info', message);
    }
    static warn(message) {
        return new Logger('warn', message);
    }
    static error(message) {
        return new Logger('error', message);
    }
    withMeta(meta) {
        this.meta = meta;
        return this;
    }
    toConsole() {
        const colorMap = {
            info: kleur_1.default.blue,
            warn: kleur_1.default.yellow,
            error: kleur_1.default.red,
        };
        const colorFunc = colorMap[this.level] || kleur_1.default.white;
        console.log('🚀', colorFunc(` [${this.timestamp}] [${this.level.toUpperCase()}] ${this.message}`));
        if (Object.keys(this.meta).length) {
            console.log(kleur_1.default.gray('Metadata:'), this.meta);
        }
        return this;
    }
    toFile() {
        const logString = JSON.stringify({
            timestamp: this.timestamp,
            level: this.level,
            message: this.message,
            meta: this.meta,
        }) + '\n';
        try {
            if (!fs_1.default.existsSync(this.filePath)) {
                fs_1.default.writeFileSync(this.filePath, '');
            }
            fs_1.default.appendFileSync(this.filePath, logString);
        }
        catch (err) {
            console.error('Log file write error:', err);
        }
        return this;
    }
    toElastic() {
        return __awaiter(this, arguments, void 0, function* (index = 'logs', userId) {
            const url = `${this.elasticEndpoint}/${index}/_doc`;
            try {
                const response = yield axios_1.default.post(url, {
                    timestamp: this.timestamp,
                    level: this.level,
                    message: this.message,
                    meta: this.meta,
                    userId: userId,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    auth: {
                        username: 'elastic',
                        password: 'changeme'
                    }
                });
                if (response.status !== 201) {
                    console.error('ElasticSearch log error:', response.data);
                }
            }
            catch (error) {
                console.error('ElasticSearch connection error:', error.message);
            }
            return this;
        });
    }
}
exports.default = Logger;
