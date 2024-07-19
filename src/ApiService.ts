import axios, { AxiosInstance } from 'axios';

class ApiService {
    private client: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
    }

    async get(endpoint: string) {
        try {
            const response = await this.client.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async post(endpoint: string, data: any) {
        try {
            const response = await this.client.post(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async put(endpoint: string, data: any) {
        try {
            const response = await this.client.put(endpoint, data);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async delete(endpoint: string) {
        try {
            const response = await this.client.delete(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ApiService;
