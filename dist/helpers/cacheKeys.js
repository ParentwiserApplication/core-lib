"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheKeys {
    static userDetail(userId) {
        return `user:${userId}`;
    }
}
CacheKeys.USER = 'user:';
exports.default = CacheKeys;
