import axios, {AxiosError, AxiosInstance} from 'axios';
import {Readable} from 'stream';
import unirest from "unirest";

interface UploadFileResponse {
    url: string;

    [key: string]: any;
}

interface FastifyFile {
    file: Readable;
    mimetype: string;
    filename: string;
    encoding: string;
    fieldname: string;
}

interface GetFileLinkResponse {
    link: string;

    [key: string]: any;
}

class StreamApiClient {
    private client: AxiosInstance;
    private baseURL: string;

    constructor(baseURL: string, token?: string) {
        this.baseURL = baseURL;
        this.client = axios.create({
            baseURL,
            headers: token ? {Authorization: `${token}`} : {},
        });
    }

    async uploadFile(file: any): Promise<any> {
        try {
            return await new Promise((resolve, reject) => {
                const request = unirest('POST', this.baseURL + '/file')
                    .headers({
                        'Content-Type': 'multipart/form-data',
                    })
                    .field('file', file.file, {
                        filename: file.filename,
                        contentType: file.mimetype,
                    });

                request.end((response) => {
                    if (response.error) {
                        console.error('Error forwarding file:', response.error);
                        reject(response.error);
                    } else {
                        console.log('Response from target service:', response.body);
                        resolve(response.body.data);
                    }
                });
            });
        } catch (error) {
            console.error('Failed to upload file:', error);
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

    async getFileLinkWithCode(code: string): Promise<GetFileLinkResponse> {
        try {
            const response = await this.client.get(`/file/link?code=${code}`);
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
