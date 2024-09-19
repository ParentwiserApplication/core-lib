declare class ParentSchoolApiClient {
    private client;
    constructor(baseURL: string, token?: string);
    get(id: number): Promise<any>;
    private handleError;
}
export default ParentSchoolApiClient;
