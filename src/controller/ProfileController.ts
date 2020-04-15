import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {Profile} from '../entity/Profile';
const gravatar = require('gravatar');
const jwt=require('jsonwebtoken');
const config=require('../config/default.json');
const bcrypt=require('bcryptjs');


export class ProfileController{
    static me=async(req:Request, res:Response)=>{
        try {
            const profileRepository=getRepository(Profile);
            const profile=await profileRepository.findOne({
                where:{
                    userId:req['user'].id
                },
                relations:[
                    "experiences",
                    "educations",
                    "user",
                    "social"
                ]
            });

            if (!profile) {
                return res.status(400).json({msg: 'No hay un perfil para este usuario'});
            }
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error en el servidor');
        }
    }
}
export default ProfileController;