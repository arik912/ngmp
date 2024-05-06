import express from 'express';
import { createUser } from './user.controller';

export const userRouter = express.Router();

userRouter.post('/create', createUser);
