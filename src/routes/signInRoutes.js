import { Router } from 'express';

import validateSignInInfos from '../middlewares/validateSignIn.js';
import insertSignInInfos from '../controllers/signInController.js';

const router = Router();

router.post('/', validateSignInInfos, insertSignInInfos);

export default router;
