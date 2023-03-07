import { Response } from 'express';

import { StorageApi } from './storage';

type RequestWithParams = Request & { params: { key: string | number } };

function handler(req: RequestWithParams, res: Response) {
  const { key } = req.params;

  try {
    StorageApi.removeByKey(key);
  } catch (e) {
    res.statusCode = 404;
    res.json(e);
    return;
  }

  res.sendStatus( 204);
}

export default (router: any) => router.delete('/:key', handler);

