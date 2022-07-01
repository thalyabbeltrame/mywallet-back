import { Router } from 'express';

import validateToken from '../middlewares/validateToken.js';
import validateTransaction from '../middlewares/validateTransaction.js';
import validateTransactionId from '../middlewares/validateTransactionId.js';
import {
  insertTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactionsController.js';

const router = Router();

router.post('/', validateToken, validateTransaction, insertTransaction);
router.get('/', validateToken, getTransactions);
router.delete('/:transactionId', validateToken, validateTransactionId, deleteTransaction);
router.put('/:transactionId', validateToken, validateTransactionId, validateTransaction, updateTransaction);

export default router;
