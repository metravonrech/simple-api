import { Response } from 'express';
import zod from 'zod';

import validateSchema from 'middlewares/validateSchema';
import { RequestWithValidatedData } from 'types';
import { StorageApi } from './storage';
type RequestData = { key: string, value: string, ttl: number };

const schema = zod.object({
  key: zod.union([zod.string(), zod.number()]),
  value: zod.union([zod.string(), zod.number()]),
  ttl: zod.number().optional(),
}, {}).strict();

function handler(req: RequestWithValidatedData<RequestData>, res: Response) {
  const { key, value, ttl } = req.validatedData;

  try {
    StorageApi.add(key, value, ttl);
  } catch (e) {
    res.statusCode = 400;
    res.json(e);
    return;
  }

  res.sendStatus(204);
}

export default (router: any) => router.post('/', validateSchema(schema), handler);
