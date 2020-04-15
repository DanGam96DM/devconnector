import {Router} from 'express';
import AuthController from '../controller/AuthController';
import {auth} from '../middleware/auth';
const router=Router();

router.get('/', [auth], AuthController.getUser);
router.post('/', AuthController.login);

export default router;