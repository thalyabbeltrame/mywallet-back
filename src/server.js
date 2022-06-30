import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { config as dotenvConfig } from 'dotenv';

import signUpRouter from './routes/signUpRoutes.js';
import signInRouter from './routes/signInRoutes.js';
import transactionsRouter from './routes/transactionsRoutes.js';

dotenvConfig();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors(), json());

app.use('/signup', signUpRouter);
app.use('/signin', signInRouter);
app.use('/transactions', transactionsRouter);

app.listen(PORT, () => {
  console.log(chalk.blue(`Server running on ${chalk.bold.italic(`http://localhost:${PORT}`)}`));
});
