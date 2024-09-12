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
class ChildApiClient {
    constructor(baseURL, token) {
        this.client = axios_1.default.create({
            baseURL,
            headers: token ? { Authorization: `${token}` } : {}
        });
    }
    createChild(name_1, dateOfBirth_1, gender_1, schoolId_1, classId_1) {
        return __awaiter(this, arguments, void 0, function* (name, dateOfBirth, gender, schoolId, classId, parentIds = []) {
            try {
                const response = yield this.client.post(`/child/`, {
                    name,
                    dateOfBirth,
                    gender,
                    schoolId,
                    classId,
                    parentIds
                });
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
exports.default = ChildApiClient;
