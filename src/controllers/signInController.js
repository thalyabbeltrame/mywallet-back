import { v4 as uuid } from 'uuid';

import { database as db } from '../databases/mongo.js';
import { httpStatus } from '../utils/httpStatus.js';

const insertSignInInfos = async (_, res) => {
  const { _id, name } = res.locals.account;
  const token = uuid();

  try {
    await db.collection('sessions').insertOne({
      userId: _id,
      token,
    });
    return res.status(httpStatus.OK).send({ name, token });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao fazer login!');
  }
};

export { insertSignInInfos };