import User from '../../models/user/user.model.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

const generateUserCode = async () => {
    try {
        const userCount = await User.countDocuments();
        const userCode = `TK${(userCount + 1).toString().padStart(4, '0')}`;
        return userCode;
    } catch (error) {
        throw new Error('Lỗi khi tạo mã người dùng: ' + error.message);
    }
};

export const register = async (req, res) => {
    const { hoTen, email, soDienThoai, username, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const userCode = await generateUserCode();
    
        const newUser = new User({
            hoTen,
            email,
            soDienThoai,
            username,
            password: hashedPassword,
            userCode,
            role: role || 'user'
        });
    
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Lỗi đăng ký người dùng:', error);
        res.status(500).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    const { hoTen, email, soDienThoai, username, password, role } = req.body;
    const userCode = await generateUserCode();
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userCode = await generateUserCode();

        const newUser = new User({
            hoTen,
            email,
            soDienThoai,
            username,
            password: hashedPassword,
            userCode,
            role: role || 'user'
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Tên đăng nhập hoặc mật khẩu không hợp lệ' });
        }

        user.lastLogin = new Date();
        await user.save();

        //đã tách jwt_secret và  expire time
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            config.JWT_SECRET,  
            { expiresIn: config.JWT_EXPIRE_TIME }  
        );
        res.status(200).json({ token, userInfo: { username: user.username, hoTen: user.hoTen, email: user.email, soDienThoai: user.soDienThoai, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user information', error });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserInfo = async (req, res) => {
    const userId = req.user.role === 'admin' ? req.params.id : req.user._id;
    const { hoTen, email, soDienThoai } = req.body;

    if (req.user.role !== 'admin' && userId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You cannot update this user\'s information.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { hoTen, email, soDienThoai },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User info updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


