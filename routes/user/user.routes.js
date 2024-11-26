import express from 'express';
import { 
    register, createUser, login,  getAllUsers, getUserById, 
    deleteUser, updateUserInfo,  getCurrentUser 
} from '../../controllers/user/user.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', auth, authorize('admin'), getAllUsers);
router.get('/infor', auth, getCurrentUser);
router.get('/:id', auth, authorize(['admin', 'user']), getUserById);
router.delete('/:id', auth, authorize('admin'), deleteUser);
router.put('/update-info', auth, updateUserInfo); 
router.put('/:id', auth, authorize('admin'), updateUserInfo); 
router.post('/create', auth, authorize('admin'), createUser);

export default router;
