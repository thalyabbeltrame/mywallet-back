import { Router } from 'express';

import validateToken from '../middlewares/validateToken.js';
import validateTransaction from '../middlewares/validateTransaction.js';
import {
  insertTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactionsController.js';

const router = Router();

router.post('/', validateToken, validateTransaction, insertTransaction);
router.get('/', validateToken, getTransaction);
router.delete('/:transactionId', validateToken, deleteTransaction);
router.put('/:transactionId', validateToken, validateTransaction, updateTransaction);

export default router;
