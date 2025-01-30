import fs from 'fs';
import fetch from 'node-fetch';

class Logger {
    private timestamp: string;
    private level: string;
    private message: string;
    private meta: any;
    private filePath: string;
    private elasticEndpoint: string;


    constructor(level, message) {
        this.timestamp = new Date().toISOString();
        this.level = level;
        this.message = message;
        this.meta = {};
        this.filePath = './timestamp-log.txt';
        this.elasticEndpoint = 'http://193.25.218.16:9200';
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
        console.log(`[${this.timestamp}] [${this.level.toUpperCase()}]`, this.message, this.meta);
        return this;
    }

    toFile() {
        const logString = JSON.stringify({
            timestamp: this.timestamp,
            level: this.level,
            message: this.message,
            meta: this.meta,
        }) + '\n';

        fs.appendFile(this.filePath, logString, (err) => {
            if (err) console.error('Log file write error:', err);
        });

        return this;
    }

    async toElastic(index = 'logs') {
        const url = `${this.elasticEndpoint}/${index}/_doc`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from('elastic:changeme').toString('base64'),
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    timestamp: this.timestamp,
                    level: this.level,
                    message: this.message,
                    meta: this.meta,
                }),
            });

            if (!response.ok) {
                console.error('ElasticSearch log error:', await response.text());
            }
        } catch (error) {
            console.error('ElasticSearch connection error:', error);
        }

        return this;
    }
}

export default Logger;
