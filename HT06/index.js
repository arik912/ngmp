import express from 'express';
import bodyParser from 'body-parser';
import { rootRouter } from './src/router.js';


const app = express();

app.use(bodyParser.json());

app.use(rootRouter);

app.listen(3000, () => {
  console.log('Server is started');
});
