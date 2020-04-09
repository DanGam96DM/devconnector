import {Router} from 'express';
import auth from './auth';
import user from './user';

const routes=Router();

routes.use('/api/auth', auth);
routes.use('/api/users', user);

export default routes;