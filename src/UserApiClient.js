const axios = require('axios');

class UserApiClient {
    constructor(baseURL, token) {
        this.client = axios.create({
            baseURL: baseURL,
            headers: token ? { Authorization: `${token}` } : {}
        });
    }

    async getUser(id) {
        try {
            const response = await this.client.get('/user/' + id);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUsers(endpoint, filters) {
        try {
            const response = await this.client.post('/user', filters);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = UserApiClient;
