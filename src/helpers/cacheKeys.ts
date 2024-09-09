export default class CacheKeys {
    static readonly USER = 'user:';

    static userDetail(userId: string): string {
        return `user:${userId}`;
    }


}
