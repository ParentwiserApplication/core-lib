import axios, { AxiosInstance, AxiosError } from 'axios';


interface IUpdateUser {
    name?:string,
    email?:string
    phone?:number,
    gender?:string,
    parentType?:string,
    marriageStatus?:string,
    lastLearnWithQuestionOrder?: number | null,
    iyzicoCardUserKey?: string | null
}

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

    async updateUser(id:string, user:IUpdateUser): Promise<any> {
        try {
            const response = await this.client.put(`/user/${id}`, user)
            return response.data.data
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async makePremium(id:string, premiumEndsAt:Date): Promise<any> {
        try {
            const response = await this.client.post(`/user/makePremium`, {
                userId:id,
                premiumEndsAt: premiumEndsAt
            })
            return response.data.data
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
