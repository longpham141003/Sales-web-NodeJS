import crypto from 'crypto';

const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); 
};

export default generateVerificationCode;
