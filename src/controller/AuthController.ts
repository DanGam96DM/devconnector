import {getRepository} from 'typeorm';
import {Request, Response} from 'express';
import {User} from '../entity/User';
const bcrypt=require('bcryptjs');
const config=require('../config/default.json');
const jwt=require('jsonwebtoken');


class AuthController {
    //@route GET api/auth
    //@desc Test route
    //@access Private
    static getUser=async(req: Request, res:Response)=>{
        try {
            const userRepository=getRepository(User);
            const user=await userRepository.find({
                select: ["id", "name", "email", "avatar", "date"],
                where:{
                    id:req['user'].id
                }
            });
            res.json(user);
        } catch (error) {
            
        }
    }


    //@route POST api/auth
    //@desc Autenticar y obtener el token
    //@access Public
    static login=async(req:Request, res:Response)=>{
        const {email, password}=req.body;
        try {
            const userRepository=getRepository(User);

            //verifica que si exista el email
            const user=await userRepository.findOne({
                where:{
                    email:email
                }
            });
            if (!user) {
                return res.status(400).json({errors: [{msg:'Email invalido'}]});
            }

            //ve si la contrase;a es correcta
            const isMatch=await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({errors: [{msg:'Contrase;a invalida'}]});
            }

            //retornar el jwt
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
        } catch (error) {
            
        }
    }
}
export default AuthController;