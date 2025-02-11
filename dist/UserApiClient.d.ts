interface IUpdateUser {
    name?: string;
    email?: string;
    phone?: number;
    gender?: string;
    parentType?: string;
    marriageStatus?: string;
    lastLearnWithQuestionOrder?: number | null;
    iyzicoCardUserKey?: string | null;
}
declare class UserApiClient {
    private client;
    constructor(baseURL: string, token?: string);
    getUsers(file: string, dimension: string, keepOriginal: boolean): Promise<any>;
    getUser(id: string): Promise<any>;
    updateUser(id: string, user: IUpdateUser): Promise<any>;
    makePremium(id: string, premiumEndsAt: Date): Promise<any>;
    getUserAddress(id: string): Promise<any>;
    getUsersBatch(userIds: string[]): Promise<any>;
    private handleError;
}
export default UserApiClient;
