import fs from 'fs';
import axios from 'axios';
import path from "node:path";
import kleur from 'kleur';


class Logger {
    private timestamp: string;
    private level: string;
    private message: string;
    private meta: any;
    private filePath: string;
    private logDir: string;
    private elasticEndpoint: string;


    constructor(level, message) {
        this.timestamp = new Date().toISOString();
        this.level = level;
        this.message = message;
        this.meta = {};
        this.logDir = './logs';
        this.filePath = path.join(this.logDir, `${new Date().toISOString().split('T')[0]}-log.txt`);
        this.elasticEndpoint = 'http://193.25.218.16:9200';

        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
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
            info: kleur.blue,
            warn: kleur.yellow,
            error: kleur.red,
        };

        const colorFunc = colorMap[this.level] || kleur.white;

        console.log('🚀',
            colorFunc(
                ` [${this.timestamp}] [${this.level.toUpperCase()}] ${this.message}`
            )
        );

        if (Object.keys(this.meta).length) {
            console.log(kleur.gray('Metadata:'), this.meta);
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
            if (!fs.existsSync(this.filePath)) {
                fs.writeFileSync(this.filePath, '');
            }

            fs.appendFileSync(this.filePath, logString);
        } catch (err) {
            console.error('Log file write error:', err);
        }

        return this;
    }

    async toElastic(index = 'logs',userId?: string) {
        const url = `${this.elasticEndpoint}/${index}/_doc`;

        try {
            const response = await axios.post(url, {
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
        } catch (error) {
            console.error('ElasticSearch connection error:', error.message);
        }

        return this;
    }
}

export default Logger;
