import {UserController} from './../controller/UserController';
import {Router} from 'express';

const router=Router();

//obtener todos los usuarios
router.get('/', UserController.getAll);

//obtener un usuario
router.get('/:id', UserController.getById);

//Crear nuevo usuario
router.post('/', UserController.newUser);

//Editar usuario
router.put('/:id', UserController.editUser);

//eliminar usuario
router.delete('/:id', UserController.deleteUser);

export default router;