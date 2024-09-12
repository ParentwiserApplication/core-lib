declare class Hashing {
    private static algorithm;
    private static secretKey;
    static encrypt(text: string): string;
    static decrypt(encryptedText: string): string;
}
export default Hashing;
