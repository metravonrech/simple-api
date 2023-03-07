import { NextFunction, Request, Response, Router } from 'express';
import { ZodSchema } from 'zod';
import { RequestWithValidatedData } from '../types';

function validateSchema(schema: ZodSchema) {
  return (req: RequestWithValidatedData<unknown>, res: Response, next: NextFunction) => {
    const dataToValidate = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    try {
      schema.parse(dataToValidate);
    } catch (error) {
      res.statusCode = 400;
      res.json(error);
      return;
    }

    req.validatedData = dataToValidate;
    next();
  };
}

export default validateSchema;
