declare class SurveyApiClient {
    private client;
    constructor(baseURL: string, token?: string);
    getAll(): Promise<any>;
    private handleError;
}
export default SurveyApiClient;
