import { database as db } from '../databases/mongo.js';
import httpStatus from '../utils/httpStatus.js';

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);

  try {
    const session = await db.collection('sessions').findOne({ token });
    if (!session) return res.status(httpStatus.UNAUTHORIZED).send('Não autorizado!');

    delete session._id;
    delete session.token;
    res.locals.session = session;
    next();
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro inesperado!');
  }
};

export default validateToken;
