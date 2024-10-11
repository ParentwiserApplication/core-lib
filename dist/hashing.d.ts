declare class Hashing {
    private static algorithm;
    private static secretKey;
    static encrypt(text: string): string;
    static decrypt(encryptedText: string): string;
    protected encrypt(data: any, secret: string): any;
    decrypt(data: any, secret: string): string;
    generateM2MAuthToken(userId: any, secret: any): Promise<any>;
}
export default Hashing;
