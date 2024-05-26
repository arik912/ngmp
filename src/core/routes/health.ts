import express, {Request, Response} from 'express';

import {asyncHandler} from '../../utils/async-handler';
import {container} from '../../../init';

export const healthRouter = express.Router();

const health = async (_: Request, res: Response) => {
  const isConnectedToDB = await container.orm.isConnected();

  isConnectedToDB
    ? res.status(200).json({
      message: 'Application is healthy'
    })
    : res.status(500).send({ message: 'Internal Server error' });
}

healthRouter.get('/health', asyncHandler(health));
