const axios = require('axios');

class StreamApiClient {
    constructor(baseURL, token) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }

    async uploadFile(file, dimension, keepOriginal) {
        try {
            const response = await this.client.post('/upload', {
                file,
                dimension,
                keepOriginal
            });
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFileLink(fileId) {
        try {
            const response = await this.client.get(`/file/${fileId}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = StreamApiClient;
