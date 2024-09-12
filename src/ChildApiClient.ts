import axios, { AxiosInstance, AxiosError } from 'axios';

class ChildApiClient {
    private client: AxiosInstance;

    constructor(baseURL:string, token?:string) {
        this.client = axios.create({
            baseURL,
            headers: token ? { Authorization : `${token}` } : {}
        })
    }

    async createChild(name:string | null, dateOfBirth:Date, gender:string, schoolId:string | null, classId:string | null, parentIds: string[] = []): Promise<any> {
        try {
            const response = await this.client.post(`/child/`, {
                name,
                dateOfBirth,
                gender,
                schoolId,
                classId,
                parentIds
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

export default ChildApiClient