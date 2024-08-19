import axios, {AxiosInstance} from 'axios';

export default class StreamApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: token ? {Authorization: `${token}`} : {}
        });
    }

    async uploadFile(file: File, dimension: string, keepOriginal: boolean): Promise<any> {
        try {
            const response = await this.client.post('/upload', {
                file,
                dimension,
                keepOriginal
            });
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFileLink(fileId: string): Promise<any> {
        try {
            const response = await this.client.get(`/file/${fileId}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}