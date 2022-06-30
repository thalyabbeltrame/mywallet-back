import { database as db } from '../databases/mongo.js';
import { httpStatus } from '../utils/httpStatus.js';
import { signUpSchema } from '../models/signUpSchema.js';

const validateSignUpInfos = async (req, res, next) => {
  const { name, email, password, passwordConfirmation } = req.body;
  const { error } = signUpSchema.validate({ name, email, password, passwordConfirmation });
  if (error) return res.send(error.details.map(({ message }) => message));
  try {
    const account = await db.collection('accounts').findOne({ email });
    if (account) return res.status(httpStatus.NOT_FOUND).send('E-mail já está em uso!');
    next();
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao criar conta!');
  }
};

export { validateSignUpInfos };
