import { Router } from 'express';

import { validateToken } from '../middlewares/validateToken.js';
import { insertTransaction, getTransaction } from '../controllers/transactionsController.js';

const transactionsRoute = Router();

transactionsRoute.post('/', validateToken, insertTransaction);
transactionsRoute.get('/', validateToken, getTransaction);

export default transactionsRoute;
