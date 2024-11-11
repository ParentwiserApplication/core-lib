import axios, { AxiosInstance, AxiosError } from 'axios';

interface SendPushNotificationResponse {
    messageId: string;
    [key: string]: any;
}

interface SendTaskMailResponse {
    emailStatus: string;
    [key: string]: any;
}

class NotificationApiClient {
    private client: AxiosInstance;

    constructor(baseUrl: string, token?: string) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: token ? { Authorization: `${token}` } : {},
        });
    }

    async sendPushNotification(
        notificationSubject: string,
        notificationContent: string,
        pushNotificationTokens: string[],
        notificationTarget: string,
        notificationTargetDetail: string
    ): Promise<SendPushNotificationResponse> {
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
            this.handleError(error);
            throw error;
        }
    }

    async sendTaskMail(
        toEmail: string,
        notificationSubject: string,
        notificationContent: string,
        nameOfUser: string = ''
    ): Promise<SendTaskMailResponse> {
        try {
            const response = await this.client.post('/mail/send/task', {
                toEmail,
                notificationSubject,
                notificationContent,
                nameOfUser,
            });
            return response.data.data;
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async sendSMS(
        phone: string,
        message: string,
    ): Promise<SendTaskMailResponse> {
        try {
            const response = await this.client.post('/sms/send/sms', {
                phone,
                message,
            });
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

export default NotificationApiClient;
