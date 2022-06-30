import Joi from 'joi';

const transactionSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().min(5).required(),
  type: Joi.valid('deposit', 'withdrawal').required(),
});

export { transactionSchema };
