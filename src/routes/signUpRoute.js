import { Router } from 'express';

import { validateSignUpInfos } from '../middlewares/validateSignUp.js';
import { insertSignUpInfos } from '../controllers/signUpController.js';

const signUpRoute = Router();

signUpRoute.post('/', validateSignUpInfos, insertSignUpInfos);

export default signUpRoute;
