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
class ParentSchoolApiClient {
    constructor(baseURL, token) {
        this.client = axios_1.default.create({
            baseURL,
            headers: token ? { Authorization: `${token}` } : {}
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get(`/parentSchool/${id}`);
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
exports.default = ParentSchoolApiClient;