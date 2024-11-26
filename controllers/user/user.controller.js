import mongoose from 'mongoose';
import User from '../../models/user/user.model.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { hoTen, email, soDienThoai, username, password, role } = req.body;

    const generateUserCode = async () => {
        let userCode;
        let count = 1;
    
        while (count <= 9999) { 
            userCode = `TK${count.toString().padStart(4, '0')}`;
            const existingUser = await User.findOne({ userCode });
    
            if (!existingUser) {
                return userCode;
            }
    
            count++;
        }
    
        throw new Error('Không thể tạo mã người dùng mới');
    };
    
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

    const generateUserCode = async () => {
        let userCode;
        let count = 1;
    
        while (count <= 9999) {
            userCode = `TK${count.toString().padStart(4, '0')}`;
            const existingUser = await User.findOne({ userCode });
    
            if (!existingUser) {
                return userCode;
            }
    
            count++;
        }
    
        throw new Error('Không thể tạo mã người dùng mới');
    };

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

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
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
    try {
        const { hoTen, email, soDienThoai } = req.body;

        if (!hoTen && !email && !soDienThoai) {
            return res.status(400).json({ message: "At least one field must be provided" });
        }

        const user = await User.findById(req.user._id); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (hoTen) user.hoTen = hoTen;
        if (email) user.email = email;
        if (soDienThoai) user.soDienThoai = soDienThoai;

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
