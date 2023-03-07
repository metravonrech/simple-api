import { Request, Response } from 'express';
import { StackApi } from './stack';

function handler(req: Request, res: Response) {
  const value = StackApi.pop();

  const response = value ? value : null;

  res.json(response);
}

export default (router: any) => router.delete('/', handler);

