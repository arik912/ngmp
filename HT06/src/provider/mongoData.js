import { connect, connection } from 'mongoose';
import * as dotenv from 'dotenv';
import { User } from '../entities/user/user.model';

dotenv.config();

const { DATABASE_HOST, DATABASE_PORT, MONGO_DATABASE, MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD } =
  process.env;

(async () => {
  try {
    await connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${MONGO_DATABASE}`, {
      user: MONGO_ROOT_USERNAME,
      pass: MONGO_ROOT_PASSWORD,
    });

    console.log('initialized');

    await User.insertMany([{}, {}, {}]);

    await  connection.close();
  } catch (error) {
    console.error(error);
  }
  }
)();