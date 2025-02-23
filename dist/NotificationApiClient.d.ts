interface SendPushNotificationResponse {
    messageId: string;
    [key: string]: any;
}
interface SendTaskMailResponse {
    emailStatus: string;
    [key: string]: any;
}
declare class NotificationApiClient {
    private client;
    constructor(baseUrl: string, token?: string);
    sendPushNotification(scope: string, userId: string, notificationSubject: string, notificationContent: string, pushNotificationTokens: string[], notificationTarget: string, notificationTargetDetail: string): Promise<SendPushNotificationResponse>;
    sendTaskMail(toEmail: string, notificationSubject: string, notificationContent: string, nameOfUser?: string): Promise<SendTaskMailResponse>;
    sendSMS(phone: string, message: string): Promise<SendTaskMailResponse>;
    sendOTP(otp: string, phone?: string, email?: string): Promise<SendTaskMailResponse>;
    private handleError;
}
export default NotificationApiClient;
