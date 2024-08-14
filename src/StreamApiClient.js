const axios = require('axios');

class StreamApiClient {
    constructor(baseURL, token) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: token ? { Authorization: `${token}` } : {}
        });
    }

    async uploadFile(file,dimesion,keepOriginal) {
        try {
            const response = await this.client.get('/user/' + id);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFileLink(fileId) {
        try {
            const response = await this.client.post('/user', filters);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StreamApiClient;
