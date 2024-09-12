declare class ChildApiClient {
    private client;
    constructor(baseURL: string, token?: string);
    createChild(name: string | null, dateOfBirth: Date, gender: string, schoolId: string | null, classId: string | null, parentIds?: string[]): Promise<any>;
    private handleError;
}
export default ChildApiClient;
