import { Router } from 'express';

import { validateSignUpInfos } from '../middlewares/validateSignUp.js';
import { insertSignUpInfos } from '../controllers/signUpController.js';

const router = Router();

router.post('/', validateSignUpInfos, insertSignUpInfos);

export default router;
