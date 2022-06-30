import { ObjectId } from 'mongodb';

import httpStatus from '../utils/httpStatus.js';
import transactionSchema from '../models/transactionSchema.js';
import getBalance from '../utils/balance.js';
import { database as db } from '../databases/mongo.js';

const validateTransaction = async (req, res, next) => {
  const { amount, description, type } = req.body;
  const transactionId = new ObjectId(req.params.transactionId);
  const { userId } = req.session;
  const { error } = transactionSchema.validate({ amount, description, type });
  if (error) return res.send(error.details.map(({ message }) => message));

  try {
    if (type === 'withdrawal') {
      const balance = await getBalance(userId);
      // if (transactionId) {
      //   const transaction = await db.collection('transactions').findOne({ _id: transactionId });
      //   balance += transaction.amount;
      // }
      if (balance - amount < 0)
        return res.status(httpStatus.UNAUTHORIZED).send(`O valor sacado deve ser inferior ao saldo de ${balance}`);
    }
    next();
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao salvar transação!');
  }
};

export default validateTransaction;