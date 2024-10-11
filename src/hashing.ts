import * as crypto from 'crypto';
import * as cryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

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

    protected encrypt(data: any, secret: string) {
        return cryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
    }

    public decrypt(data: any, secret: string) {
        let result = "";
        const bytes = cryptoJS.AES.decrypt(data, secret).toString(cryptoJS.enc.Utf8);
        if (bytes) {
            result = JSON.parse(bytes);
        }
        return result;
    }

    public async generateM2MAuthToken(userId, secret): Promise<any> {
        return jwt.sign({data: this.encrypt(userId + '_' + Date.now(), secret)}, secret);
    }
}

export default Hashing;
