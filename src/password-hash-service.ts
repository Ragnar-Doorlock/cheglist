import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 11;

export class PasswordHashService {
    static async hash(password: string) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    static async compare(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }
}
