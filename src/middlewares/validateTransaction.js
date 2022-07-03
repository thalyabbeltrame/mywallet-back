import httpStatus from '../utils/httpStatus.js';
import transactionSchema from '../models/transactionSchema.js';

const validateTransaction = async (req, res, next) => {
  const { amount, description, type } = req.body;
  const { error } = transactionSchema.validate({ amount, description, type });
  if (error) return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details.map(({ message }) => message));
  next();
};

export default validateTransaction;
