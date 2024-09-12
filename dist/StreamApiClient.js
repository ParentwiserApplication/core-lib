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
const axios_1 = __importDefault(require("axios"));
const unirest_1 = __importDefault(require("unirest"));
class StreamApiClient {
    constructor(baseURL, token) {
        this.baseURL = baseURL;
        this.client = axios_1.default.create({
            baseURL,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield new Promise((resolve, reject) => {
                    const request = (0, unirest_1.default)('POST', this.baseURL + '/file')
                        .headers({
                        'Content-Type': 'multipart/form-data',
                    })
                        .field('file', file.file, {
                        filename: file.filename,
                        contentType: file.mimetype,
                    });
                    request.end((response) => {
                        if (response.error) {
                            console.error('Error forwarding file:', response.error);
                            reject(response.error);
                        }
                        else {
                            console.log('Response from target service:', response.body);
                            resolve(response.body.data);
                        }
                    });
                });
            }
            catch (error) {
                console.error('Failed to upload file:', error);
                throw error;
            }
        });
    }
    getFileLink(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get(`/file/${fileId}`);
                return response.data.data;
            }
            catch (error) {
                this.handleError(error);
                throw error;
            }
        });
    }
    handleError(error) {
        if (error.response) {
            console.error('Error Response:', error.response.data);
        }
        else if (error.request) {
            console.error('Error Request:', error.request);
        }
        else {
            console.error('Error Message:', error.message);
        }
    }
}
exports.default = StreamApiClient;
