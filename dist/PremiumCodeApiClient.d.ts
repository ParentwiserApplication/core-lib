declare class PremiumCodeApiClient {
    private client;
    constructor(baseURL: string, token?: string);
    create(userId: string, maxUsageCount: number, childId: string, startDatetime: Date, dayCount: number, schoolId: string): Promise<any>;
    private handleError;
}
export default PremiumCodeApiClient;
