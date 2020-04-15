import {Router} from 'express';
import auth from './auth';
import user from './user';
import profile from './profile';

const routes=Router();

routes.use('/api/auth', auth);
routes.use('/api/users', user);
routes.use('/api/profile', profile);
export default routes;