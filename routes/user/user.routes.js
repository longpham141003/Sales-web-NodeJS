import express from 'express';
import {
    register,
    createUser,
    login,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserInfo,
    getCurrentUser,
} from '../../controllers/user/user.controller.js';
import { auth, authorize } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import {
    registerSchema,
    loginSchema,
    createUserSchema,
    updateUserInfoSchema,
} from '../../validations/user.validation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/create', auth, authorize('admin'), validate(createUserSchema), createUser);
router.put('/update-info', auth, validate(updateUserInfoSchema), updateUserInfo);
router.put('/:id', auth, authorize('admin'), validate(updateUserInfoSchema), updateUserInfo);
router.get('/all', auth, authorize('admin'), getAllUsers);
router.get('/infor', auth, getCurrentUser);
router.get('/:id', auth, authorize(['admin', 'user']), getUserById);
router.delete('/:id', auth, authorize('admin'), deleteUser);

export default router;
