import axios, { AxiosInstance, AxiosError } from 'axios';

interface UploadFileResponse {
    url: string;
    [key: string]: any;
}

interface GetFileLinkResponse {
    link: string;
    [key: string]: any;
}

class StreamApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.client = axios.create({
            baseURL,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }

    async uploadFile(file: string, dimension: string, keepOriginal: boolean): Promise<UploadFileResponse> {
        try {
            const response = await this.client.post('/upload', {
                file,
                dimension,
                keepOriginal,
            });
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getFileLink(fileId: string): Promise<GetFileLinkResponse> {
        try {
            const response = await this.client.get(`/file/${fileId}`);
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    private handleError(error: AxiosError): void {
        if (error.response) {
            console.error('Error Response:', error.response.data);
        } else if (error.request) {
            console.error('Error Request:', error.request);
        } else {
            console.error('Error Message:', error.message);
        }
    }
}

export default StreamApiClient;
