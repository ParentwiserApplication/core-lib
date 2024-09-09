import axios, { AxiosInstance, AxiosError } from 'axios';



class UserApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.client = axios.create({
            baseURL,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }

    async getUsers(file: string, dimension: string, keepOriginal: boolean): Promise<any> {
        try {
            const response = await this.client.get('/user/users');
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async getUser(id: string): Promise<any> {
        try {
            const response = await this.client.get(`/user/${id}`);
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

export default UserApiClient;
