import express from 'express';
import {
    addUser,
    getAllUsers,
} from '../controllers/userController';
import { CreateUserDTO } from '../dtos/user.dto';
import { ValidationMiddleware } from '../middleware/validation.middleware';

const router = express.Router();

router.post('/api/users', ValidationMiddleware(CreateUserDTO), addUser);
router.get('/api/users', getAllUsers);


export default router;
