import {ProfileController} from '../controller/ProfileController';
import {Router} from 'express';
import {auth} from '../middleware/auth';
const router=Router();

router.get('/me', [auth], ProfileController.me);
router.post('/', [auth], ProfileController.createUpdate);
router.get('/', ProfileController.getAllProfile);
router.get('/user/:user_id', ProfileController.findById);
router.delete('/', [auth], ProfileController.deleteProfile);
router.put('/experience', [auth], ProfileController.addProfileExperienca);
router.delete('/experience/:exp_id', [auth], ProfileController.deleteProfileExperience);
router.put('/education', [auth], ProfileController.addProfileEducation);
router.delete('/education/:edu_id', [auth], ProfileController.deleteProfileEducation);
router.get('/github/:username', ProfileController.getProfileGit);

export default router;