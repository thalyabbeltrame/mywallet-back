import { MongoClient } from 'mongodb';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017';

let database = null;
const mongoClient = new MongoClient(MONGO_URI);

try {
  await mongoClient.connect();
  database = mongoClient.db('my-wallet');
  console.log(chalk.blue(`Connected to database ${chalk.bold.blue(database.databaseName)}`));
} catch (err) {
  console.log(err);
}

export default database;
