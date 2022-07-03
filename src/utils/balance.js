import { database as db } from '../databases/mongo.js';

const getBalance = async (userId) => {
  try {
    const transactions = await db.collection('transactions').find({ userId: userId }).toArray();
    const balance = transactions
      .map((transaction) => {
        return { ...transaction, amount: Number(transaction.amount) };
      })
      .reduce((acc, curr) => {
        if (curr.type === 'deposit') {
          return acc + curr.amount;
        } else {
          return acc - curr.amount;
        }
      }, 0);
    return balance;
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao obter o saldo!');
    return 0;
  }
};

export default getBalance;
