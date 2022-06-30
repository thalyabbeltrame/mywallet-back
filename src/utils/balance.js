import { database as db } from '../databases/mongo.js';

const getBalance = async (userId) => {
  const transactions = await db.collection('transactions').find({ userId: userId }).toArray();
  const balance = transactions.reduce((acc, curr) => {
    if (curr.type === 'deposit') {
      return acc + curr.amount;
    } else {
      return acc - curr.amount;
    }
  }, 0);
  return balance;
};

export { getBalance };