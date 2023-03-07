import { Response } from 'express';
import { StorageApi } from './storage';

type RequestWithParams = Request & { params: { key: string | number } };

function handler(req: RequestWithParams, res: Response) {
  const { key } = req.params;

  const result = StorageApi.findByKey(key);

  res.statusCode = 200;
  res.json(result);
}

export default (router: any) => router.get('/:key', handler);

