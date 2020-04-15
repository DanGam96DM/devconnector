import {UserController} from './../controller/UserController';
import {Router} from 'express';

const router=Router();

//Crear nuevo usuario
router.post('/', UserController.newUser);


export default router;