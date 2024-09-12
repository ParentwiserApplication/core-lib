import * as crypto from 'crypto';

class Hashing {
    private static algorithm: string = 'aes-256-cbc';
    private static secretKey: string = '4e5d7d2c8f9aef47b36221cd86d4fadb3e843cd531ab3d9e0b0c0edabf8f2c57';


    static encrypt(text: string): string {
        const iv = crypto.randomBytes(16);
        const key = Buffer.from(Hashing.secretKey, 'hex');

        const cipher = crypto.createCipheriv(this.algorithm, key, iv);


        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return iv.toString('hex') + ':' + encrypted;
    }

    static decrypt(encryptedText: string){
        const [ivHex, encrypted] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const key = Buffer.from(Hashing.secretKey, 'hex');

        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }
}

export default Hashing;
