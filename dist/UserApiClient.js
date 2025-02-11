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
class UserApiClient {
    constructor(baseURL, token) {
        this.client = axios_1.default.create({
            baseURL,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }
    getUsers(file, dimension, keepOriginal) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get('/user/users');
                return response.data.data;
            }
            catch (error) {
                this.handleError(error);
                throw error;
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get(`/user/${id}`);
                return response.data.data;
            }
            catch (error) {
                this.handleError(error);
                throw error;
            }
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.put(`/user/${id}`, user);
                return response.data.data;
            }
            catch (error) {
                this.handleError(error);
                throw error;
            }
        });
    }
    makePremium(id, premiumEndsAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.post(`/user/makePremium`, {
                    userId: id,
                    premiumEndsAt: premiumEndsAt
                });
                return response.data.data;
            }
            catch (error) {
                this.handleError(error);
                throw error;
            }
        });
    }
    getUserAddress(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.get(`/userAddress/${id}`);
                return response.data.data;
            }
            catch (error) {
                this.handleError(error);
                throw error;
            }
        });
    }
    getUsersBatch(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.post(`/batch`, {
                    userIds: userIds
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
exports.default = UserApiClient;
