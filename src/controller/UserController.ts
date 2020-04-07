import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';

export class UserController {
    static getAll=async(req:Request, res:Response)=>{
        const userRepository=getRepository(User);
        try { 
            const users=await userRepository.find();

            if (users.length>0) {
                res.send(users);
            }else {
                res.status(404).json({message: 'Sin resultados'});
            }
        } catch (error) {
            return res.status(400).json({message: 'Error en el servidor'});
        }
    }
    static getById=async(req:Request, res:Response)=>{
        const {id}=req.params;
        const userRepository=getRepository(User);
        try {
            const user=await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            return res.status(404).json({message: 'Sin resultado'});
        }
    }
    static newUser=async (req:Request, res:Response)=>{
        const {username, password, role}=req.body;
        try {
            const user=new User();
            user.username=username;
            user.password=password;
            user.role=role;

            //validar
            const errors=await validate(user);
            if (errors.length>0) {
                return res.status(400).json(errors);
            }
            //guardar
            const userRepository=getRepository(User);
            await userRepository.save(user);
            res.send('User Creado');
        } catch (error) {
            return res.status(400).json({message: 'El usuario ya existe'});
        }
    }
    static editUser=async(req:Request, res:Response)=>{
        let user;
        const {id}=req.params;
        const {username, role}=req.body;
        const userRepository=getRepository(User);
        try {
            user=await userRepository.findOneOrFail(id);
            user.username=username;
            user.role=role;
        } catch (error) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        const errors=await validate(user);
        if (errors.length>0) {
            return res.status(400).json(errors);
        }

        try {
            await userRepository.save(user);
        } catch (error) {
           return res.status(409).json({message: 'Username ya existe'});
        }
        res.status(201).json({message:'Usuario actualizado'});
    }
    static deleteUser=async(req:Request, res:Response)=>{
        const {id}=req.params;
        const userRepository=getRepository(User);
        let user:User;
        try {
            user=await userRepository.findOneOrFail(id);

        } catch (error) {
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        //eliminar usuario
        userRepository.delete(id);
        res.status(201).json({message:'Usuario eliminado'});
    }
}

export default UserController;