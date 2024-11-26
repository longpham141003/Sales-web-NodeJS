import crypto from 'crypto';

// Hàm tạo mã xác thực gồm 6 ký tự
const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Mã xác thực gồm 6 ký tự
};

export default generateVerificationCode;
