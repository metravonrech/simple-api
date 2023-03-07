import { Response } from 'express';
import zod from 'zod';

import validateSchema from 'middlewares/validateSchema';
import { RequestWithValidatedData } from 'types';
import { StackApi } from './stack';

const schema = zod.object({
  value: zod.union([
    zod.string(),
    zod.number(),
  ]),
}, {}).strict();

async function handler(req: RequestWithValidatedData<{ value: string | number }>, res: Response) {
  const { value } = req.validatedData;
  StackApi.push(value);

  res.sendStatus(204);
}

export default (router: any) => router.post('/', validateSchema(schema), handler);

