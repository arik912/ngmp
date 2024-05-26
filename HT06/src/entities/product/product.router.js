import express from 'express';
import { getProductById, getProducts, addProduct } from './product.controller';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProductById);
productRouter.post('/create', addProduct);
