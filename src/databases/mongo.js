import { MongoClient } from 'mongodb';
import { config as dotenvConfig } from 'dotenv';
import chalk from 'chalk';

dotenvConfig();

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DATABASE = process.env.DATABASE || 'my-wallet';

let database = null;
const mongoClient = new MongoClient(MONGO_URI);

try {
  await mongoClient.connect();
  database = mongoClient.db(DATABASE);
  console.log(chalk.blue(`Connected to database ${chalk.bold.blue(database.databaseName)}`));
} catch (err) {
  console.log(err);
}

export { database };
