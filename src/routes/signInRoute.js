import { Router } from 'express';

import { validateSignInInfos } from '../middlewares/validateSignIn.js';
import { insertSignInInfos } from '../controllers/signInController.js';

const signInRoute = Router();

signInRoute.post('/', validateSignInInfos, insertSignInInfos);

export default signInRoute;
