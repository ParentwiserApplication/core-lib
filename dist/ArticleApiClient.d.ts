declare class ArticleApiClient {
    private client;
    constructor(baseURL: string, token?: string);
    get(id: number): Promise<any>;
    private handleError;
}
export default ArticleApiClient;
