import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {User} from "../entity/User";
import {validate} from 'class-validator';
const gravatar = require('gravatar');
const jwt=require('jsonwebtoken');
const config=require('../config/default.json');
const bcrypt=require('bcryptjs');

export class UserController {
    //@route POST api/users
    //@desc Register user
    //@access Public
    static newUser=async (req:Request, res:Response)=>{
        const {name, email, password}=req.body;
        try {
            const userRepository=getRepository(User);
            const existingUser=await userRepository.findOne({email});
            if (existingUser) {
                return res.status(400).json({errors:[{msg: 'El usuario ya existe'}]});
            }
            //obtener el gravatar del usuario
            const avatar=gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            //encriptar la contrase;a
            const salt=await bcrypt.genSalt(10);
            const encryptedPassword=await bcrypt.hash(password, salt);

            let user=new User();
            user.name=name;
            user.email=email;
            user.password=encryptedPassword;
            user.avatar=avatar;

            const errors=await validate(user);
            if (errors.length>0) {
                return res.status(400).json({errors: errors});
            } else {
                await userRepository.save(user);

                //retornar el jsonwebtoken
                const payload={
                    user:{
                        id:user.id
                    }
                }
                jwt.sign(payload, config.jwtToken,
                    {expiresIn: 360000},
                    (err, token)=>{
                        if(err) throw err;
                        res.json({token});
                    }
                );
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error de servidor');
        }
    }
}

export default UserController;