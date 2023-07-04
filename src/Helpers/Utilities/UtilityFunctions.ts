import * as bcrypt from 'bcrypt';

const REGEX_PASSWORD =
    /^(?=.*[a-zàáèéìíòóùúñ])(?=.*[A-ZÀÁÈÉÌÍÒÓÙÚÑ])(?=.*\d)[A-Za-z\dàáèéìíòóùúñÀÁÈÉÌÍÒÓÙÚÑ@$¡!%;,*.?#^=&_-]{8,20}$/;

export default class UtilityFunctions {

    static async getEncryptData(data: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            data = bcrypt.hashSync(data, salt);
            return data;
        } catch (e) {
            throw new Error('Bcrypt generate password error');
        }
    }

    static async getEncryptCompare(data: string, encryptData: string): Promise<boolean> {
        try {
            const dataValidation = bcrypt.compareSync(data, encryptData);
            console.log('dataValidation: ', dataValidation)
            if (!dataValidation) {
                return false;
            }
            console.log('dataValidation: ', dataValidation)
            return true;
        } catch (e) {
            throw new Error('Bcrypt compare error');
        }
    }

    static async getValidationCode(): Promise<string> {
        try {
            const randomValidationCode = await Math.floor(Math.random() * (9999 - 1000 + 1) + 1001);
            return randomValidationCode.toString();
        } catch (e) {
            throw new Error('Get validation code error');
        }
    }

    static async isPasswordValid(password: string): Promise<boolean> {
        const match = password.match(REGEX_PASSWORD);
        return match !== null;
    }
}
