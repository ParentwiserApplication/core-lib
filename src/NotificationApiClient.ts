import axios, {AxiosInstance} from 'axios';

export default class NotificationApiClient {
    private client: AxiosInstance;

    constructor(baseUrl: string, token?: string) {
        this.client = axios.create({
            baseURL: baseUrl,
            headers: token ? {Authorization: `${token}`} : {},
        });
    }

    async sendPushNotification(
        notificationSubject: string,
        notificationContent: string,
        pushNotificationTokens: string[],
        notificationTarget: string,
        notificationTargetDetail: string
    ): Promise<any> {
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
        toEmail: string,
        notificationSubject: string,
        notificationContent: string,
        nameOfUser: string = ''
    ): Promise<any> {
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
