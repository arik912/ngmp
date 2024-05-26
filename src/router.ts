import express from 'express';
import { cartRouter } from './resources/cart/cart.routes';
import { authMiddleware } from './middlewares/auth';
import { productRouter } from './resources/product/product.routes';
import { authRouter } from './core/routes/auth';
import {healthRouter} from './core/routes/health';


export const rootRouter = express.Router();

rootRouter.use(authRouter);
rootRouter.use(healthRouter);
rootRouter.use('/api/profile/cart', authMiddleware, cartRouter);
rootRouter.use('/api/products', authMiddleware, productRouter);
