import axios, { AxiosInstance } from 'axios';

class UserService {
    private client: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: token ? { Authorization: `${token}` } : {}
        });
    }

    async getUser(id: string) {
        try {
            const response = await this.client.get('/user/'+id);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUsers(endpoint: string, filters: any) {
        try {
            const response = await this.client.post('/user', filters);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}

export default UserService;
