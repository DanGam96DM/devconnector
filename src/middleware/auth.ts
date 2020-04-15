import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
const config=require('../config/default.json');

export const auth=(req: Request, res: Response, next: NextFunction)=>{
    //Get token del header
    const token=req.header('x-auth-token');
    //checke si no hay token
    if (!token) {
        return res.status(401).json({msg: 'No hay token, autorizacion denegada'});

    }
    //verificar token
    try{
        const decoded=jwt.verify(token, config.jwtToken);
        req['user']=decoded['user'];
        next();
    }catch{
        res.status(401).json({msg: 'El token no es valido'});
    }
};

