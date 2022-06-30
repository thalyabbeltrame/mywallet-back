import bcrypt from 'bcrypt';

import { database as db } from '../databases/mongo.js';
import httpStatus from '../utils/httpStatus.js';
import signInSchema from '../models/signInSchema.js';

const validateSignInInfos = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = signInSchema.validate({ email, password });
  if (error) return res.send(error.details.map(({ message }) => message));

  try {
    const account = await db.collection('accounts').findOne({ email });
    if (!account) return res.status(httpStatus.NOT_FOUND).send('Conta não encontrada!');

    const isPasswordCorrect = await bcrypt.compare(password, account.password);
    if (!isPasswordCorrect) return res.status(httpStatus.UNAUTHORIZED).send('Senha incorreta!');

    delete account.email;
    delete account.password;

    res.locals.account = account;
    next();
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao fazer login!');
  }
};

export default validateSignInInfos;