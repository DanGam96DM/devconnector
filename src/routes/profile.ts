import {ProfileController} from '../controller/ProfileController';
import {Router} from 'express';
import {auth} from '../middleware/auth';
const router=Router();

router.get('/me', [auth], ProfileController.me);

export default router;