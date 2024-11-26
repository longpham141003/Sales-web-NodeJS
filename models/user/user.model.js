import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    hoTen: {
        type: String,
        required: [true, 'Vui lòng nhập họ tên']
    },
    email: {
        type: String,
        required: [true, 'Vui lòng nhập email'],
        unique: true
    },
    soDienThoai: {
        type: String,
        required: [true, 'Vui lòng nhập số điện thoại']
    },
    username: {
        type: String,
        required: [true, 'Vui lòng nhập tên đăng nhập'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    lastLogin: {
        type: Date,
        default: null
    },
    userCode: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);
export default User;
