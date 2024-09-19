import axios, { AxiosInstance, AxiosError } from 'axios';

class ParentSchoolApiClient {
    private client: AxiosInstance;

    constructor(baseURL:string, token?:string) {
        this.client = axios.create({
            baseURL,
            headers: token ? { Authorization: `${token}`} : {}
        })
    }

    async get(id:number): Promise<any> {
        try {
            const response = await this.client.get(`/parentSchool/${id}`)
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

export default ParentSchoolApiClient