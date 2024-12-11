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
class PremiumCodeApiClient {
    constructor(baseURL, token) {
        this.client = axios_1.default.create({
            baseURL,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }
    create(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, maxUsageCount = 1, childId, startDatetime = new Date(), dayCount = 30, schoolId) {
            try {
                const response = yield this.client.post(`/premiumCode/code`, {
                    userId,
                    maxUsageCount,
                    childId,
                    startDatetime,
                    dayCount,
                    schoolId
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
            console.error("Error Response:", error.response.data);
        }
        else if (error.request) {
            console.error("Error Request:", error.request);
        }
        else {
            console.error("Error Message:", error.message);
        }
    }
}
exports.default = PremiumCodeApiClient;
