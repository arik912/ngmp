import { Request, Response, NextFunction } from 'express';

import {
  BaseException,
  ForbiddenException,
  UnauthorizedException,
  NotFoundException,
  ValidationException
} from '../exceptions';
import { responseWrapper } from '../utils/responseWrapper';
import logger from '../core/logger';

function getStatusByException(err: BaseException): number {
  if (err instanceof NotFoundException) {
    return 404;
  }
  if (err instanceof ForbiddenException) {
    return 403;
  }
  if (err instanceof UnauthorizedException) {
    return 401;
  }
  if (err instanceof ValidationException) {
    return 400;
  }
  return 500;
}

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  logger.error('Error received:', err);
  if (err instanceof BaseException) {
    res.status(getStatusByException(err)).send(responseWrapper(null, err.message));
    return;
  }

  res.status(500).send(responseWrapper(null, 'Internal Server error'));
}
