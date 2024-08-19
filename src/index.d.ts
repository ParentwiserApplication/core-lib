// index.d.ts

declare module 'core-lib' {

    export class UserApiClient {
        constructor(baseURL: string, token?: string);
        getUser(id: string): Promise<any>;
        getUsers(filters: object): Promise<any>;
    }

    export class StreamApiClient {
        constructor(baseURL: string, token?: string);
        uploadFile(file: File, dimension: string, keepOriginal: boolean): Promise<any>;
        getFileLink(fileId: string): Promise<any>;
    }

    export class NotificationApiClient {
        constructor(baseUrl: string, token?: string);
        sendPushNotification(
            notificationSubject: string,
            notificationContent: string,
            pushNotificationTokens: string[],
            notificationTarget: string,
            notificationTargetDetail: string
        ): Promise<any>;
        sendTaskMail(
            toEmail: string,
            notificationSubject: string,
            notificationContent: string,
            nameOfUser?: string
        ): Promise<any>;
    }
}
