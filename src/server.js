import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import { config as dotenvConfig } from 'dotenv';

import { signUpRoute } from './routes/signUpRoute.js';
import { signInRoute } from './routes/signInRoute.js';
import { transactionsRoute } from './routes/transactionsRoute.js';

dotenvConfig();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(json());

app.use('/signup', signUpRoute);
app.use('/signin', signInRoute);
app.use('/transactions', transactionsRoute);

app.listen(PORT, () => {
  console.log(chalk.blue(`Server running on ${chalk.bold.italic(`http://localhost:${PORT}`)}`));
});
