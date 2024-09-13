interface GetFileLinkResponse {
    link: string;
    [key: string]: any;
}
declare class StreamApiClient {
    private client;
    private baseURL;
    constructor(baseURL: string, token?: string);
    uploadFile(file: any): Promise<any>;
    getFileLink(fileId: string): Promise<GetFileLinkResponse>;
    private handleError;
}
export default StreamApiClient;
