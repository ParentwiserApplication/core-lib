const axios = require('axios');

class NotificationApiClient {
    constructor(baseUrl, token) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }

    async sendPushNotification(
        notificationSubject,
        notificationContent,
        pushNotificationTokens,
        notificationTarget,
        notificationTargetDetail
    ) {
        try {
            const response = await this.client.post('/push/send/notification', {
                notificationSubject,
                notificationContent,
                pushNotificationTokens,
                notificationTarget,
                notificationTargetDetail,
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async sendTaskMail(
        toEmail,
        notificationSubject,
        notificationContent,
        nameOfUser = ''
    ) {
        try {
            const response = await this.client.post('/mail/send/task', {
                toEmail,
                notificationSubject,
                notificationContent,
                nameOfUser,
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = NotificationApiClient;
