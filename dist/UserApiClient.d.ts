declare class UserApiClient {
    private client;
    constructor(baseURL: string, token?: string);
    getUsers(file: string, dimension: string, keepOriginal: boolean): Promise<any>;
    getUser(id: string): Promise<any>;
    private handleError;
}
export default UserApiClient;
