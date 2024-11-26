import jwt from 'jsonwebtoken';
import User from '../models/user/user.model.js';
import config from '../config.js';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Vui lòng đăng nhập.' });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: 'Token không hợp lệ.' });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        auth, 
        (req, res, next) => {
            if (!roles.length || roles.includes(req.user.role)) {
                return next();
            }
            return res.status(403).json({ message: 'Bạn không có quyền truy cập vào tài nguyên này.' });
        }
    ];
};

export { auth, authorize };
