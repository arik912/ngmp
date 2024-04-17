import express from 'express';
import { cartRouter } from './entities/cart/cart.router.js';
import { auth } from './auth.middlewares.js';
import { productRouter } from './entities/product/product.router.js';


export const rootRouter = express.Router();

rootRouter.use('/api/profile/cart', auth, cartRouter);
rootRouter.use('/api/products', auth, productRouter);
