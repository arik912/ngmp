import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const { DATABASE_HOST, DATABASE_PORT, MONGO_DATABASE, MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD } =
  process.env;

export const init = async () => {
  try {
    await connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${MONGO_DATABASE}`, {
      user: MONGO_ROOT_USERNAME,
      pass: MONGO_ROOT_PASSWORD,
    });

    console.log('initialized');
  } catch (error) {
    console.error(error);
  }
};
