import {getRepository} from "typeorm";
import {Request, Response} from "express";
import {Profile} from '../entity/Profile';
import {Social} from '../entity/Social';
import {validate} from 'class-validator';
import { User } from "../entity/User";
import { Experience } from "../entity/Experience";
import { Education } from "../entity/Education";
const config=require('../config/default.json');
const requestGit=require('request');

export class ProfileController{
    //@route GET api/profile/me
    //@desc Obtener el perfil del usuario actual
    //@access Private
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
    };

    //@route POST api/profile
    //@desc Crear o actualizar el perfil del usuario logueado
    //@access Private
    static createUpdate=async(req: Request, res:Response)=>{
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        }=req.body;

        try {
            const profileRepository=getRepository(Profile);
            const socialRepository=getRepository(Social);
            let profile=await profileRepository.findOne({
                where:{
                    user:req['user'].id
                }
            });
            if (profile) {
                //actualizar perfil
                const updateProfile=await profileRepository.findOne({
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
                updateProfile.company=company;
                updateProfile.website=website;
                updateProfile.location=location;
                updateProfile.bio=bio;
                updateProfile.status=status;
                updateProfile.githubusername=githubusername;
                if (skills) {
                    const newSkills=skills.split(',').map(skill=>skill.trim());
                    updateProfile.skills=newSkills;
                }
                updateProfile.social.youtube=youtube;
                updateProfile.social.facebook=facebook;
                updateProfile.social.twitter=twitter;
                updateProfile.social.instagram=instagram;
                updateProfile.social.linkedin=linkedin;

                const errors=await validate(updateProfile);
                if (errors.length>0) {
                    return res.status(400).json({errors: errors});
                }

                await profileRepository.save(updateProfile);
                return res.json(updateProfile);
            }

            //crear perfil
            const newProfile=new Profile();
            newProfile.company=company;
            newProfile.website=website;
            newProfile.location=location;
            newProfile.bio=bio;
            newProfile.status=status;
            newProfile.githubusername=githubusername;
            if (skills) {
                newProfile.skills=skills.split(',').map(skill=>skill.trim());
            }
            newProfile.user=req['user'].id;     
            let errors=await validate(newProfile);
            if (errors.length>0) {
                return res.status(400).json({errors: errors});
            } 
            await profileRepository.save(newProfile);

            //crear social
            const newSocial=new Social();
            newSocial.youtube=youtube;
            newSocial.facebook=facebook;
            newSocial.twitter=twitter;
            newSocial.instagram=instagram;
            newSocial.linkedin=linkedin;
            newSocial.profile=newProfile;
            await socialRepository.save(newSocial);

            profile=await profileRepository.findOne({
                where:{id: newProfile.id},
                relations:[
                    "experiences",
                    "educations",
                    "user",
                    "social"
                ]
            });
            return res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    };


    // @route  GET api/profile
    // @desc   Obtener todos los perfiles
    // @access Public
    static getAllProfile=async(req: Request, res:Response)=>{
        try {
            const profileRepository=getRepository(Profile);
            let profile=await profileRepository.find({
                relations:[
                    "user",
                    "experiences",
                    "educations",
                    "social"
                ]
            });
            return res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('SERVER ERROR');
        }
    };

    // @route  GET api/profile/user/:user_id
    // @desc   Obtener perfil por id de usuario
    // @access Public
    static findById=async(req: Request, res:Response)=>{
        try {
            const profileRepository=getRepository(Profile);
            let profile=await profileRepository.findOne({
                where:{
                    user:req.params.user_id
                },
                relations:[
                    "user",
                    "experiences",
                    "educations",
                    "social"
                ]
            });
            if (!profile) {
                return res.status(400).json({msg: 'No hay perfil para este usuario'});
            }
            return res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('SERVER ERROR');
        }
    };

    // @route  DELETE api/profile
    // @desc   Eliminar perfil, user y posts
    // @access Private
    static deleteProfile=async(req:Request, res:Response)=>{
        try {
            const userRepository=getRepository(User);
            let user=await userRepository.findOne({
                where:{
                    id:req['user'].id
                }
            });
            await userRepository.remove(user);

            return res.json({msg:'Usuario eliminado'});
        } catch (error) {
            
        }
    };

    // @route  PUT api/profile/experience
    // @desc   A;adir experiencia en el perfil
    // @access Private
    static addProfileExperienca=async(req:Request, res:Response)=>{
        const{
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }=req.body;
        
        try {
            const profileRepository=getRepository(Profile);
            const experienceRepository=getRepository(Experience);
            let profile=await profileRepository.findOne({
                where:{
                    user:req['user'].id
                },
            });
            const experience=new Experience();
            experience.title=title;
            experience.company=company;
            experience.location=location;
            experience.from=from;
            experience.to=to;
            experience.current=current;
            experience.description=description;
            experience.profile=profile;

            let errors=await validate(experience);
            if (errors.length>0) {
                return res.status(400).json({errors: errors});
            } 
            
            await experienceRepository.save(experience);
            profile=await profileRepository.findOne({
                where:{
                    user:req['user'].id
                },
                relations:[
                    "experiences",
                    "educations",
                    "user",
                    "social"
                ]
            });
            return res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    };

    // @route  DELETE api/profile/experience/:exp_id
    // @desc   Eliminar experiencia del perfil
    // @access Private
    static deleteProfileExperience=async(req:Request, res:Response)=>{
        try {
            const profileRepository=getRepository(Profile);
            const experienceRepository=getRepository(Experience);

            let experience=await experienceRepository.findOne({
                where:{
                    id:req.params.exp_id
                }
            });
            if (!experience) {
                return res.status(400).json({msg:'No se ha encontrado'});
            }
            await experienceRepository.remove(experience);
            
            let profile=await profileRepository.findOne({
                where:{
                    user:req['user'].id
                },
                relations:[
                    "experiences",
                    "educations",
                    "user",
                    "social"
                ]
            });

            return res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    };

    // @route  PUT api/profile/education
    // @desc   A;adir educacion en el perfil
    // @access Private
    static addProfileEducation=async(req:Request, res:Response)=>{
        const{
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }=req.body;
        try {
            const profileRepository=getRepository(Profile);
            const educationRepository=getRepository(Education);
            let profile=await profileRepository.findOne({
                where:{
                    user:req['user'].id
                },
            });
            const education=new Education();
            education.school=school;
            education.degree=degree;
            education.fieldofstudy=fieldofstudy;
            education.from=from;
            education.to=to;
            education.current=current;
            education.description=description;
            education.profile=profile;

            let errors=await validate(education);
            if (errors.length>0) {
                return res.status(400).json({errors: errors});
            } 
            
            await educationRepository.save(education);
            profile=await profileRepository.findOne({
                where:{
                    user:req['user'].id
                },
                relations:[
                    "experiences",
                    "educations",
                    "user",
                    "social"
                ]
            });
            return res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    };

    // @route  DELETE api/profile/education/:edu_id
    // @desc   Eliminar educacion del perfil
    // @access Private
    static deleteProfileEducation=async(req: Request, res: Response)=>{
        try {
            const profileRepository=getRepository(Profile);
            const educationRepository=getRepository(Education);

            let education=await educationRepository.findOne({
                where:{
                    id:req.params.edu_id
                }
            });
            if (!education) {
                return res.status(400).json({msg:'No se ha encontrado'});
            }
            await educationRepository.remove(education);
            
            let profile=await profileRepository.findOne({
                where:{
                    user:req['user'].id
                },
                relations:[
                    "experiences",
                    "educations",
                    "user",
                    "social"
                ]
            });

            return res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    };

    // @route  GET api/profile/github/:username
    // @desc   GET repositorios de github
    // @access Public
    static getProfileGit=async(req:Request, res:Response)=>{
        try {
            const options={
                uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.githubClientId}&client_secret=${config.githubSecret}`,
                method: 'GET',
                headers:{'user-agent':'node.js'}
            };
            requestGit(options, (error, response, body)=>{
                if (error) {
                    console.error(error);
                }
                if (response.statusCode!==200) {
                   return res.status(404).json({msg:"No github profile found"});
                }
                return res.json(JSON.parse(body));
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
}
export default ProfileController;