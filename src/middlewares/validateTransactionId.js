import { ObjectId } from 'mongodb';

import { database as db } from '../databases/mongo.js';
import httpStatus from '../utils/httpStatus.js';

const validateTransactionId = async (req, res, next) => {
  const transactionId = new ObjectId(req.params.transactionId);
  const { userId } = res.locals.session;

  try {
    const transaction = await db.collection('transactions').findOne({ _id: transactionId });
    if (!transaction) return res.status(httpStatus.NOT_FOUND).send('Id da transação não encontrado!');
    if (transaction.userId.toString() != userId.toString())
      return res.status(httpStatus.UNAUTHORIZED).send('Você não tem permissão para executar essa ação!');
    next();
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao validar Id da transação!');
  }
};

export default validateTransactionId;
