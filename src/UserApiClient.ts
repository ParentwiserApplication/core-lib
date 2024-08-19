import axios, {AxiosInstance} from 'axios';

export default class UserApiClient {
    private client: AxiosInstance;

    constructor(baseURL: string, token?: string) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: token ? {Authorization: `${token}`} : {}
        });
    }

    async getUser(id: string): Promise<any> {
        try {
            const response = await this.client.get(`/user/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUsers(filters: object): Promise<any> {
        try {
            const response = await this.client.post('/user', filters);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
