import { Request, Response } from 'express';
import * as productService from './product.service';
import { responseWrapper } from '../../utils/responseWrapper';


export async function getProducts(req: Request, res: Response) {
  const products = await productService.getProducts();
  res.status(200).json(responseWrapper(products));
}

export async function getProductById(req: Request<{ productId: string }>, res: Response) {
  const product = await productService.getProductById(req.params.productId);
  res.status(200).json(responseWrapper(product));
}
